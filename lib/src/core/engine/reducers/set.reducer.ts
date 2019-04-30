import {EngineEvents} from '../engine.events';
import {InsertCharReducer} from './insert-char.reducer';
import {NewLineReducer} from './new-line.reducer';

export function SetReducer(source: EngineEvents.BufferEvent, event: EngineEvents.SetEvent): EngineEvents.BufferEvent {
    return event.value.split('').reduce((acc, next) => {
        return next === '\r' ? NewLineReducer(acc) : InsertCharReducer(acc, next);
    }, source);
}
