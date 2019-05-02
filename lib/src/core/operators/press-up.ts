import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {CursorEvent} from '../events';

/**
 * Moves the cursor up one row.
 */
export function pressUp(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'cursor', direction: 'up'} as CursorEvent)));
}
