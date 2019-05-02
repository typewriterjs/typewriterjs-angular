import {eventsAppend} from '../../internal/events/events-append';
import {TapEvent} from '../events';

/**
 * Triggers the callback when the stream is played
 */
export function tapEvents(callback: () => void) {
    return eventsAppend(() => [{type: 'tap', callback} as TapEvent]);
}
