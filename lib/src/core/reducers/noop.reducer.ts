import {BufferEvent} from '../events/engine.events';

/**
 * Does not mutate the source.
 */
export function NoopReducer(source: BufferEvent): BufferEvent {
    return source;
}
