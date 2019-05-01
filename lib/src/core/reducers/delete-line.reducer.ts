import {BufferEvent, DeleteLineEvent} from '../events';

export function deleteLineReducer(source: BufferEvent, event: DeleteLineEvent): BufferEvent {
    const b = {...source, text: source.text.slice()};
    b.text.splice(b.row, 1);
    if (b.row === b.text.length) {
        b.row--;
    }
    return b;
}
