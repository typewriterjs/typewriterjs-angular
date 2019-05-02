import {BufferEvent} from '../events';
import {CssClassEvent} from '../events/css-class.event';

export function cssClassReducer(source: BufferEvent, event: CssClassEvent): BufferEvent {
    return {...source, css: event.value};
}
