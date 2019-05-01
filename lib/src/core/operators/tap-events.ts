import {eventsAppend} from '../../internal/events/events-append';

/**
 * Triggers the callback when the stream is played
 */
export function tapEvents(callback: () => void) {
    return eventsAppend(() => [{type: 'tap', callback}]);
}
