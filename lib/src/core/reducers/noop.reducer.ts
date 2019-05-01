import {BufferEvent} from '../events/buffer.event';

/**
 * Does not mutate the source.
 */
export function NoopReducer(source: BufferEvent): BufferEvent {
    return source;
}
