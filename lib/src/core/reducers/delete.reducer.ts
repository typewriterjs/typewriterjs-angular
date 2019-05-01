import {isEndOfFile, isEndOfLine} from '../../internal/utils/buffer-utils';
import {BufferEvent, DeleteEvent} from '../events';

export function deleteReducer(source: BufferEvent, event: DeleteEvent): BufferEvent {
    if (isEndOfFile(source)) {
        return source;
    }

    const b = {...source, text: source.text.slice()};
    b.text[b.row] = b.text[b.row].slice();

    if (isEndOfLine(b)) {
        b.text[b.row] = [...b.text[b.row], ...b.text[b.row + 1]];
        b.text.splice(b.row + 1, 1);
    } else {
        b.text[b.row].splice(b.column, 1);
    }

    return b;
}
