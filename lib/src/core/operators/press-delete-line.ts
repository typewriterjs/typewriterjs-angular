import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Deletes the current line.
 */
export function pressDeleteLine(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'delete-line'})));
}
