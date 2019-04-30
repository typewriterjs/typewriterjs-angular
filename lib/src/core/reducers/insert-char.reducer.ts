import {BufferEvent} from '../events/engine.events';

/**
 * Inserts a character at the current cursor location and moves the cursor forward.
 */
export function InsertCharReducer(source: BufferEvent, char: string): BufferEvent {
    const b = {...source};
    b.text = b.text.slice();
    if (b.text[b.row] === undefined) {
        b.text[b.row] = [];
    }
    b.text[b.row] = b.text[b.row].slice();
    b.text[b.row].splice(b.column, 0, {char, color: b.color});
    b.column++;
    return b;
}