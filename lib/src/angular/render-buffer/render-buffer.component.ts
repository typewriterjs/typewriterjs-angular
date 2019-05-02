import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {BufferEvent} from '../../core/events';
import {bufferToHtml} from '../../core/utils';

@Component({
    selector: 'rg-render-buffer',
    templateUrl: './render-buffer.component.html',
    styleUrls: ['./render-buffer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderBufferComponent {
    public lines: string[];

    @Input()
    public set buffer(buffer: BufferEvent) {
        this.lines = bufferToHtml(buffer);
    }
}
