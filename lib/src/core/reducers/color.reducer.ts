import {BufferEvent, ColorEvent} from '../events';

export function colorReducer(source: BufferEvent, event: ColorEvent): BufferEvent {
    const b = {...source};
    b.color = event.value;
    return b;
}
