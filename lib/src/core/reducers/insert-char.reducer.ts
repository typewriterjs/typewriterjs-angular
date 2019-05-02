import {BufferEvent} from '../events';

/**
 * Inserts a character at the current cursor location and moves the cursor forward.
 */
export function insertCharReducer(source: BufferEvent, char: string): BufferEvent {
    const b = {...source};
    b.text = b.text.slice();
    if (b.text[b.row] === undefined) {
        b.text[b.row] = [];
    }
    b.text[b.row] = b.text[b.row].slice();
    b.text[b.row].splice(b.column, 0, {char, css: b.css});
    b.column++;
    return b;
}
