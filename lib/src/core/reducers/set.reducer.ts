import {BufferEvent} from '../events/buffer.event';
import {SetEvent} from '../events/set.event';
import {InsertCharReducer} from './insert-char.reducer';
import {NewLineReducer} from './new-line.reducer';

export function SetReducer(source: BufferEvent, event: SetEvent): BufferEvent {
    return event.value.split('').reduce((acc, next) => {
        return next === '\r' ? NewLineReducer(acc) : InsertCharReducer(acc, next);
    }, source);
}
