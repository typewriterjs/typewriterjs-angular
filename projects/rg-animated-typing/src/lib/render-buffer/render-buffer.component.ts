import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {EngineEvents} from '../engine/engine.events';

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
    public set buffer(buffer: EngineEvents.BufferEvent) {
        if (!buffer) {
            this.lines = [];
            return;
        }
        this.lines = buffer.text.map((t, indx) => this._toHtml(buffer.text[indx].slice(), indx, buffer.row, buffer.column));
    }

    private _toHtml(chars: EngineEvents.BufferChar[], indx: number, row: number, column: number): string {
        if (indx === row) {
            chars.splice(column, 0, undefined);
        }
        let color = null;
        let html = chars.map(char => {
            let str = '';
            if (char) {
                if (color !== char.color) {
                    if (color !== null) {
                        str += '</span>';
                    }
                    str += `<span class="c${char.color}">`;
                }
                color = char.color;
                str += char.char;
            } else {
                str += '<span class="cursor"></span>';
            }
            return str;
        }).join('');
        if (html !== '') {
            html += '</span>';
        }
        return html === '' ? '&nbsp;' : html;
    }
}
