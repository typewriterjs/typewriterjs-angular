import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BufferEvent, EventQueue} from 'rg-animated-typing';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Component({
    selector: 'rg-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    host: {
        '[class.card]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit, OnDestroy {
    @Input()
    public block: boolean = false;

    public buffer$: Observable<BufferEvent>;

    @Input()
    public light: boolean = false;

    public readonly paused$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public readonly playing$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    @Input()
    public queue: EventQueue;

    @Input()
    public title: string;

    private readonly _cancel$: Subject<void> = new Subject();

    private readonly _destroyed$: Subject<void> = new Subject();

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit(): void {
    }

    public pause() {
        this.paused$.next(true);
    }

    public play() {
        this.buffer$ = this.queue.play(merge(this._cancel$, this._destroyed$), this.paused$).pipe(
            finalize(() => this.playing$.next(false))
        );
        this.playing$.next(true);
    }

    public resume() {
        this.paused$.next(false);
    }

    public stop() {
        this._cancel$.next();
        this.paused$.next(false);
    }
}
