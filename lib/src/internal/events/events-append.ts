import {EventQueue, EventsOperator} from '../../core/event-queue';
import {DelayEvent} from '../../core/events';

export function eventsAppend(events: () => DelayEvent[]): EventsOperator {
    return (queue: EventQueue): EventQueue => {
        return events().reduce((acc, next) => acc.append(next), queue);
    };
}
