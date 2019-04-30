import {EventQueue} from './event-queue';
import {DelayEvent} from '../events/engine.events';
import {EventsOperator} from './events-operator';

export function eventsAppend(events: () => DelayEvent[]): EventsOperator {
    return (queue: EventQueue): EventQueue => {
        return events().reduce((acc, next) => acc.append(next), queue);
    };
}
