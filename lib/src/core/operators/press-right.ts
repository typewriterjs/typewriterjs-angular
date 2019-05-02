import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {CursorEvent} from '../events';

/**
 * Moves the cursor to the right.
 */
export function pressRight(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'cursor', direction: 'right'} as CursorEvent)));
}
