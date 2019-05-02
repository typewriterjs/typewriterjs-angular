import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {DeleteLineEvent} from '../events';

/**
 * Deletes the current line.
 */
export function pressDeleteLine(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'delete-line'} as DeleteLineEvent)));
}
