import {BufferChar, BufferEvent} from '../events';

function toHtml(chars: BufferChar[], indx: number, row: number, column: number): string {
    if (indx === row) {
        chars = chars.slice();
        chars.splice(column, 0, undefined);
    }
    let cssClass = null;
    let html = chars.map(char => {
        let str = '';
        if (char) {
            const css = char.css || null;
            if (cssClass !== css) {
                if (cssClass !== null) {
                    str += '</span>';
                }
                if (css !== null) {
                    str += `<span class="${css}">`;
                }
            }
            cssClass = css;
            str += char.char;
        } else {
            str += '<span class="cursor"></span>';
        }
        return str;
    }).join('');
    if (cssClass !== null) {
        html += '</span>';
    }
    return html === '' ? '&nbsp;' : html;
}

export function bufferToHtml(buffer?: BufferEvent): string[] {
    return buffer
        ? buffer.text.map((t, indx) => toHtml(buffer.text[indx], indx, buffer.row, buffer.column))
        : [];
}
