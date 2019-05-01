import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EventQueue} from '../../../lib/src/core/event-queue/event-queue';
import {pause} from '../../../lib/src/core/operators/pause';
import {pressNewLine} from '../../../lib/src/core/operators/press-new-line';
import {typeChars} from '../../../lib/src/core/operators/type-chars';

@Component({
    selector: 'rg-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {

    public simple: EventQueue;

    public ngOnInit(): void {
        this.simple = EventQueue.create().pipe(
            typeChars('Hello,'),
            pause(1000),
            pressNewLine(),
            typeChars('This is a simple example of text being typed on the screen.'),
            pressNewLine(2),
            typeChars('The text can be written slowly or quickly.')
        );
    }
}
