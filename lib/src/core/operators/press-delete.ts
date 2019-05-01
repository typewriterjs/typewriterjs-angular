import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Deletes a character to the right.
 */
export function pressDelete(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'delete'})));
}
