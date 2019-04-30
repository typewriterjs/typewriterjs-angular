import {eventsAppend} from '../event-queue/events-append';
import {EventsOperator} from '../event-queue/events-operator';

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Inserts a string immediately into the buffer without a delay.
 */
export function setChars(value: string): EventsOperator {
    return eventsAppend(() => {
        return escapeHtml(value).split(/({{\d}})/).map(str => {
            const m = str.match(/{{(\d)}}/);
            return m
                ? {type: 'color', value: parseInt(m[1], 10), delay: 0}
                : {type: 'set', value: str, delay: 0};
        });
    });
}
