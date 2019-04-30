import {BufferEvent, ColorEvent} from '../events/engine.events';

export function ColorReducer(source: BufferEvent, event: ColorEvent): BufferEvent {
    const b = {...source};
    b.color = event.value;
    return b;
}
