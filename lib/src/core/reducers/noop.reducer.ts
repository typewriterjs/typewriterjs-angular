import {BufferEvent} from '../events';

/**
 * Does not mutate the source.
 */
export function noopReducer(source: BufferEvent): BufferEvent {
    return source;
}
