import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';

/**
 * Moves the cursor to the end of the line.
 */
export function pressEnd(): EventsOperator {
    return eventsAppend(() => [{type: 'cursor', direction: 'end'}]);
}
