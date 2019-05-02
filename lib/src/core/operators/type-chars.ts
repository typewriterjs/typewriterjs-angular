import {eventsAppend} from '../../internal/events/events-append';
import {splitCss} from '../../internal/utils/split-css';
import {EventsOperator} from '../event-queue';
import {DelayEvent, KeyPressEvent} from '../events';
import {CssClassEvent} from '../events/css-class.event';

/**
 * Types a sequence of characters and moves the cursor forward.
 */
export function typeChars(characters: string): EventsOperator {
    return eventsAppend(() => {
        const events: DelayEvent[] = [];
        splitCss(characters,
            (css) => {
                events.push({type: 'css', value: css, delay: 0} as CssClassEvent);
                return null;
            },
            (text) => {
                text.split('').forEach(value => events.push({type: 'key', value} as KeyPressEvent));
                return null;
            }
        );
        return events;
    });
}
