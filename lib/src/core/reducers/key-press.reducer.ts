import {BufferEvent} from '../events/buffer.event';
import {KeyPressEvent} from '../events/key-press.event';
import {InsertCharReducer} from './insert-char.reducer';
import {NewLineReducer} from './new-line.reducer';

export function KeyPressReducer(source: BufferEvent, event: KeyPressEvent): BufferEvent {
    return event.value === '\r'
        ? NewLineReducer(source)
        : InsertCharReducer(source, event.value);
}
