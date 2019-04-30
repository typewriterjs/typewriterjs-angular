import {isObservable, Observable} from 'rxjs';
import {distinctUntilChanged, filter, first} from 'rxjs/operators';
import {DelayEvent, isSpeedEvent} from '../events/engine.events';
import {EventsOperator} from './events-operator';

function aggregateSpeed(events: DelayEvent[], fastForward: boolean): DelayEvent[] {
    const DEFAULT_SPEED = 15;
    let speed = DEFAULT_SPEED;
    return events.map(event => {
        if (isSpeedEvent(event)) {
            speed = typeof event.value === 'undefined' ? DEFAULT_SPEED : event.value;
            return null;
        }
        if (fastForward && (typeof event.delay === 'number' || typeof event.delay === 'undefined')) {
            return {...event, delay: 0};
        }
        const d = speed + Math.floor(Math.random() * Math.floor(speed));
        return Object.assign({delay: d}, event);
    }).filter(Boolean);
}

export class EventQueue {
    private constructor(private readonly _events: DelayEvent[]) {
    }

    public static create(): EventQueue {
        return new EventQueue([]);
    }

    public append(event: DelayEvent): EventQueue {
        return new EventQueue([...this._events, event]);
    }

    public pipe(...args: EventsOperator[]): EventQueue {
        return args.filter(Boolean).reduce((acc, next) => next(acc), this);
    }

    public streamUntil(pause$: Observable<boolean>, cancel$: Observable<any>, fastForward: boolean = false)
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
}