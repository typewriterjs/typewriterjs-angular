import {eventsAppend} from '../../internal/events/events-append';
import {EventsOperator} from '../event-queue';
import {CssClassEvent} from '../events/css-class.event';

/**
 * Sets the current color for text.
 */
export function cssClass(value?: string): EventsOperator {
    return eventsAppend(() => [{type: 'css', value: value || '', delay: 0} as CssClassEvent]);
}
