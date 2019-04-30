import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Sets the current color for text.
 */
export function color(value: number): EventsOperator {
    return eventsAppend(() => [{type: 'color', value, delay: 0}]);
}
