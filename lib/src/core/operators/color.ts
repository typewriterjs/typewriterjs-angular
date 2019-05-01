import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';

/**
 * Sets the current color for text.
 */
export function color(value: number): EventsOperator {
    return eventsAppend(() => [{type: 'color', value, delay: 0}]);
}
