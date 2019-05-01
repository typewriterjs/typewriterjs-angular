import {DelayEvent} from '../events/delay.event';
import {EventQueue} from './event-queue';
import {EventsOperator} from './events-operator';

export function eventsAppend(events: () => DelayEvent[]): EventsOperator {
    return (queue: EventQueue): EventQueue => {
        return events().reduce((acc, next) => acc.append(next), queue);
    };
}
