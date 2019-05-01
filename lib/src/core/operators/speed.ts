import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';

/**
 * Changes the playback speed.
 */
export function speed(value?: number): EventsOperator {
    return eventsAppend(() => [{type: 'speed', value}]);
}
