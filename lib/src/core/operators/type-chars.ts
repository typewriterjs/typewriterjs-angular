import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Types a sequence of characters and moves the cursor forward.
 */
export function typeChars(characters: string): EventsOperator {
    return eventsAppend(() => characters.split('').map(value => ({type: 'key', value})));
}
