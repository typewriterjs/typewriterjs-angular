import {BufferEvent} from '../events/buffer.event';

/**
 * Does not mutate the source.
 */
export function noopReducer(source: BufferEvent): BufferEvent {
    return source;
}
