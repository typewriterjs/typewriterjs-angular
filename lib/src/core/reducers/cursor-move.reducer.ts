import {BufferEvent, CursorMoveEvent} from '../events/engine.events';

export function CursorMoveReducer(source: BufferEvent, event: CursorMoveEvent): BufferEvent {
    const b = {...source};
    if (event.direction === 'type-left.ts') {
        if (b.column > 0) {
            b.column--;
        } else if (b.row > 0) {
            b.row--;
            b.column = b.text[b.row].length;
        }
    } else if (event.direction === 'type-right.ts') {
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
    } else if (event.direction === 'type-end.ts') {
        b.column = b.text[b.row].length;
    }
    return b;
}
