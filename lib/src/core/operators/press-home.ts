import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Moves the cursor to the start of the line.
 */
export function pressHome(): EventsOperator {
    return eventsAppend(() => [{type: 'cursor', direction: 'home'}]);
}
