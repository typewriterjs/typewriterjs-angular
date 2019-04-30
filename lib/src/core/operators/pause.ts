import {Observable} from 'rxjs';
import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

/**
 * Adds a delay to the buffer stream.
 */
export function pause(delay: number | Observable<any> = 1000): EventsOperator {
    return eventsAppend(() => [{type: 'pause', delay}]);
}
