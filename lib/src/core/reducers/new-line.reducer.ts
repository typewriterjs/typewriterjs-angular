import {BufferEvent} from '../events';

/**
 * Inserts a new line of text in the buffer.
 */
export function newLineReducer(source: BufferEvent): BufferEvent {
    const b = {...source};
    b.column = 0;
    b.row++;
    if (b.row === b.text.length - 1) {
        b.text = [...b.text, []];
    } else {
        b.text.splice(b.row, 0, []);
    }
    return b;
}
