import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {SpeedEvent} from '../events';

/**
 * Changes the playback speed.
 */
export function speed(value?: number): EventsOperator {
    return eventsAppend(() => [{type: 'speed', value} as SpeedEvent]);
}
