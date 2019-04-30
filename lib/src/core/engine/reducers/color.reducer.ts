import {EngineEvents} from '../engine.events';

export function ColorReducer(source: EngineEvents.BufferEvent, event: EngineEvents.ColorEvent): EngineEvents.BufferEvent {
    const b = {...source};
    b.color = event.value;
    return b;
}
