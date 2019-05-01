import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BufferEvent, EventQueue, pause, pressNewLine, speed, tapEvents, typeChars} from 'rg-animated-typing';
import {Observable, Subject} from 'rxjs';

@Component({
    selector: 'rg-example-async',
    templateUrl: './example-async.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleAsyncComponent implements OnInit, OnDestroy {
    public buffer$: Observable<BufferEvent>;

    public queue: EventQueue;

    private readonly _continue$: Subject<void> = new Subject();

    private readonly _destroyed$: Subject<void> = new Subject();

    public constructor(private _change: ChangeDetectorRef) {

    }

    public ngOnDestroy(): void {
        this._destroyed$.next();
        this._destroyed$.complete();
    }

    public ngOnInit() {
        this.queue = EventQueue.create().pipe(
            speed(25),
            tapEvents(() => this.buffer$ = undefined),
            typeChars('Hello, I can start another animation and wait for it to finish.'),
            pressNewLine(), pause(500),
            tapEvents(() => this._startChild()),
            pause(this._continue$),
            typeChars('The child animation has finished!'),
        );
    }

    private _startChild() {
        this.buffer$ = EventQueue.create().pipe(
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
