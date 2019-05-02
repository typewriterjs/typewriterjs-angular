import {DelayEvent} from '../../core/events';
import {escapeHtml} from './escape-html';

export function splitCss(value: string, css: (value: string) => DelayEvent, text: (value: string) => DelayEvent): DelayEvent[] {
    return escapeHtml(value)
        .split(/({{[_\-a-z0-9\s]+}}|{{}})/i)
        .map(str => {
            const m = str.match(/{{([_\-a-z0-9\s]+)|{{}}/);
            return m ? css(m[1]) : text(str);
        });
}
