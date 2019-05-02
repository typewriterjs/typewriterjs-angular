import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {DeleteEvent} from '../events';

/**
 * Deletes a character to the right.
 */
export function pressDelete(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'delete'} as DeleteEvent)));
}
