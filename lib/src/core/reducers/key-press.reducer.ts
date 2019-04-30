import {BufferEvent, KeyPressEvent} from '../events/engine.events';
import {InsertCharReducer} from './insert-char.reducer';
import {NewLineReducer} from './new-line.reducer';

export function KeyPressReducer(source: BufferEvent, event: KeyPressEvent): BufferEvent {
    return event.value === '\r'
        ? NewLineReducer(source)
        : InsertCharReducer(source, event.value);
}
