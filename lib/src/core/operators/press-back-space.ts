import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {BackspaceEvent} from '../events';

/**
 * Deletes a character to the left.
 */
export function pressBackSpace(count: number = 1): EventsOperator {
    return eventsAppend(() => Array(count).fill(null).map(() => ({type: 'backspace'} as BackspaceEvent)));
}
