import {BufferEvent} from '../events/buffer.event';
import {CursorEvent} from '../events/cursor.event';

export function CursorMoveReducer(source: BufferEvent, event: CursorEvent): BufferEvent {
    const b = {...source};
    if (event.direction === 'left') {
        if (b.column > 0) {
            b.column--;
        } else if (b.row > 0) {
            b.row--;
            b.column = b.text[b.row].length;
        }
    } else if (event.direction === 'right') {
        if (b.column < b.text[b.row].length) {
            b.column++;
        } else {
            b.column = 0;
            if (b.row < b.text.length - 1) {
                b.row++;
            }
        }
    } else if (event.direction === 'home') {
        b.column = 0;
    } else if (event.direction === 'end') {
        b.column = b.text[b.row].length;
    }
    return b;
}
