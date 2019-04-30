import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Moves the cursor to the end of the line.
 */
export function pressEnd(): EventsOperator {
    return eventsAppend(() => [{type: 'cursor', direction: 'end'}]);
}
