import {EngineEvents} from '../engine.events';

/**
 * Does not mutate the source.
 */
export function NoopReducer(source: EngineEvents.BufferEvent): EngineEvents.BufferEvent {
    return source;
}
