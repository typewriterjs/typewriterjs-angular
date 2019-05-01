import {BufferEvent} from '../events/buffer.event';
import {ColorEvent} from '../events/color.event';

export function ColorReducer(source: BufferEvent, event: ColorEvent): BufferEvent {
    const b = {...source};
    b.color = event.value;
    return b;
}
