import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';

/**
 * Moves the cursor to the start of the line.
 */
export function pressHome(): EventsOperator {
    return eventsAppend(() => [{type: 'cursor', direction: 'home'}]);
}
