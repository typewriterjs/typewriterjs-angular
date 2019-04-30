import {EngineEvents} from '../engine.events';

/**
 * Inserts a new line of text in the buffer.
 */
export function NewLineReducer(source: EngineEvents.BufferEvent): EngineEvents.BufferEvent {
    const b = {...source};
    b.text = b.text.slice();
    b.column = 0;
    b.row++;
    if (b.row > b.text.length - 1) {
        b.text.push([]);
    }
    return b;
}
