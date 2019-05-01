import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BufferEvent} from 'rg-animated-typing/core/events/buffer.event';
import {Observable, Subject} from 'rxjs';
import {EventQueue} from '../../../lib/src/core/event-queue/event-queue';
import {pause} from '../../../lib/src/core/operators/pause';
import {pressNewLine} from '../../../lib/src/core/operators/press-new-line';
import {speed} from '../../../lib/src/core/operators/speed';
import {tapEvents} from '../../../lib/src/core/operators/tap-events';
import {typeChars} from '../../../lib/src/core/operators/type-chars';

@Component({
    selector: 'rg-example-async',
    templateUrl: './example-async.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAsyncComponent implements OnInit, OnDestroy {
    public asyncBuffer$: Observable<BufferEvent>;

    public asyncExample: EventQueue;

    private readonly _continue$: Subject<void> = new Subject();

    private readonly _destroyed$: Subject<void> = new Subject();

    public constructor(private _change: ChangeDetectorRef) {

    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit() {
        this.asyncExample = EventQueue.create().pipe(
            speed(25),
            tapEvents(() => this.asyncBuffer$ = undefined),
            typeChars('Hello, I can start another animation and wait for it to finish.'),
            pressNewLine(), pause(500),
            tapEvents(() => this._startChild()),
            pause(this._continue$),
            typeChars('The child animation has finished!'),
        );
    }

    private _startChild() {
        this.asyncBuffer$ = EventQueue.create().pipe(
            speed(25),
            typeChars('Hello, I am a child animation.'),
            pause(1000), pressNewLine(),
            typeChars('When I am finished I\'ll notify the animation on the left to continue.'),
            pause(1000), pressNewLine(),
            typeChars('Finished!'),
            tapEvents(() => this._continue$.next())
        ).play(this._destroyed$);
        this._change.markForCheck();
    }
}
