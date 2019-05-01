import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Moves the cursor up one row.
 */
export function pressUp(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'cursor', direction: 'up'})));
}
