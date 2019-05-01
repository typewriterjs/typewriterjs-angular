import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {EventQueue} from '../../../lib/src/core/event-queue/event-queue';
import {simpleScript} from '../scripts/simple.script';

@Component({
    selector: 'rg-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {

    public simple: EventQueue = simpleScript();

    public ngOnInit(): void {
    }
}
