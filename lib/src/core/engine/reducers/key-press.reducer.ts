import {EngineEvents} from '../engine.events';
import {InsertCharReducer} from './insert-char.reducer';
import {NewLineReducer} from './new-line.reducer';

export function KeyPressReducer(source: EngineEvents.BufferEvent, event: EngineEvents.KeyPressEvent): EngineEvents.BufferEvent {
    return event.value === '\r'
        ? NewLineReducer(source)
        : InsertCharReducer(source, event.value);
}
