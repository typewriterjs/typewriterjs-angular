import {eventsAppend} from '../../internal/events/events-append';
import {splitCss} from '../../internal/utils/split-css';
import {EventsOperator} from '../event-queue';
import {SetEvent} from '../events';
import {CssClassEvent} from '../events/css-class.event';

/**
 * Inserts a string immediately into the buffer without a delay.
 */
export function setChars(value: string): EventsOperator {
    return eventsAppend(() => {
        return splitCss(value,
            (css) => ({type: 'css', value: css, delay: 0} as CssClassEvent),
            (text) => ({type: 'set', value: text, delay: 0} as SetEvent)
        );
    });

    // return eventsAppend(() => {
    //     return escapeHtml(value).split(/({{[_\-a-z0-9\s]+}}|{{}})/i).map(str => {
    //         const m = str.match(/{{([_\-a-z0-9\s]+)|{{}}/);
    //         return m
    //             ? {type: 'css', value: m[1], delay: 0} as CssClassEvent
    //             : {type: 'set', value: str, delay: 0} as SetEvent;
    //     });
    // });
}
