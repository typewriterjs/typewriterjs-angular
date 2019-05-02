import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {CursorEvent} from '../events';

/**
 * Moves the cursor to the start of the line.
 */
export function pressHome(): EventsOperator {
    return eventsAppend(() => [{type: 'cursor', direction: 'home'} as CursorEvent]);
}
