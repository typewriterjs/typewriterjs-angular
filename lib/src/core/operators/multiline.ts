import {EventQueue, EventsOperator} from '../event-queue';
import {pause} from './pause';
import {pressNewLine} from './press-new-line';
import {typeChars} from './type-chars';

export interface MultilineOptions {
    /**
     * If set, will pause the animation at the end of lines.
     */
    endPause?: number;
    /**
     * If true, the animation will finish with the cursor on a new line. If false, the animation will finish with the cursor
     * at the end of the last line.
     */
    finishNewLine?: boolean;
    /**
     * If set, will pause the animation at the start of lines.
     */
    prePause?: number;
}


export function multiline(lines: string[], options: MultilineOptions = {}): EventsOperator {
    return (queue: EventQueue): EventQueue => {
        return lines.reduce((q, line, indx) => {
            if (indx !== 0 && options.prePause) {
                q = q.pipe(pause(options.prePause));
            }
            q = q.pipe(typeChars(line));
            if (options.endPause) {
                q = q.pipe(pause(options.endPause));
            }
            if (indx !== lines.length - 1 || options.finishNewLine) {
                q = q.pipe(pressNewLine());
            }
            return q;
        }, queue);
    };
}
