import {isObservable, Observable, of} from 'rxjs';
import {distinctUntilChanged, filter, first} from 'rxjs/operators';
import {aggregateSpeed} from '../../internal/events/aggregate-speed';
import {BufferEvent, DelayEvent} from '../events';
import {eventsReducer} from '../reducers';
import {EventsOperator} from './events-operator';

export class EventQueue {
    private constructor(private readonly _events: DelayEvent[]) {
    }

    public static create(): EventQueue {
        return new EventQueue([]);
    }

    public append(event: DelayEvent): EventQueue {
        return new EventQueue([...this._events, event]);
    }

    public events(cancel$: Observable<any>, pause$: Observable<boolean> = of(false), fastForward: boolean = false)
        : Observable<DelayEvent> {

        const events = aggregateSpeed(this._events, fastForward);

        return new Observable(observer => {
            let cancelWait = Function.prototype;
            let cancelled = false;
            let paused = false;
            let resumeCb = Function.prototype;

            function done() {
                observer.complete();
                cancelSubscribe.unsubscribe();
                pausedSubscribe.unsubscribe();
                resumeSubscribe.unsubscribe();
            }

            const cancelSubscribe = cancel$.pipe(first()).subscribe(() => {
                cancelled = true;
                cancelWait();
                done();
            });

            const pausedSubscribe = pause$.pipe(
                distinctUntilChanged(),
                filter(value => Boolean(value))
            ).subscribe(() => {
                paused = true;
                resumeCb = Function.prototype;
            });

            const resumeSubscribe = pause$.pipe(
                distinctUntilChanged(),
                filter(value => Boolean(value) === false)
            ).subscribe(() => {
                paused = false;
                resumeCb();
            });

            function waitFunc(cb: () => void, delay: number | Observable<any>) {
                if (paused) {
                    resumeCb = cb;
                    return Function.prototype;
                } else if (typeof delay === 'number' && delay !== 0) {
                    const h = window.setTimeout(cb, delay);
                    return () => window.clearTimeout(h);
                } else if (isObservable(delay)) {
                    const subscription = delay.pipe(first()).subscribe(() => cb());
                    return () => subscription.unsubscribe();
                }
                cb();
                return Function.prototype;
            }

            function next(arr: DelayEvent[], current: DelayEvent) {
                cancelWait = waitFunc(() => {
                    observer.next(current);
                    const event = arr.shift();
                    if (event && !cancelled) {
                        next(arr, event);
                    } else {
                        done();
                    }
                }, current.delay);
            }

            if (events.length) {
                const event = events.shift();
                next(events, event);
            } else {
                done();
            }
        });
    }

    public pipe(...args: EventsOperator[]): EventQueue {
        return args.filter(Boolean).reduce((acc, next) => next(acc), this);
    }

    public play(cancel$: Observable<any>, pause$: Observable<boolean> = of(false), fastForward: boolean = false)
        : Observable<BufferEvent> {
        return this.events(cancel$, pause$, fastForward).pipe(
            eventsReducer()
        );
    }
}
