import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Changes the playback speed.
 */
export function speed(value?: number): EventsOperator {
    return eventsAppend(() => [{type: 'speed', value}]);
}
