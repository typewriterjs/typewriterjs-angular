import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {CursorEvent} from '../events';

/**
 * Moves the cursor to the end of the line.
 */
export function pressEnd(): EventsOperator {
    return eventsAppend(() => [{type: 'cursor', direction: 'end'} as CursorEvent]);
}
