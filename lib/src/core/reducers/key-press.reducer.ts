import {BufferEvent, KeyPressEvent} from '../events';
import {insertCharReducer} from './insert-char.reducer';
import {newLineReducer} from './new-line.reducer';

export function keyPressReducer(source: BufferEvent, event: KeyPressEvent): BufferEvent {
    return event.value === '\r'
        ? newLineReducer(source)
        : insertCharReducer(source, event.value);
}
