import {EventQueue} from '../event-queue/event-queue';
import {WHITE, YELLOW} from './colors';
import {EventsOperator} from '../event-queue/events-operator';
import {color} from './color';
import {pressNewLine} from './press-new-line';
import {pause} from './pause';
import {typeChars} from './type-chars';
import {prompt} from './prompt';

export function multiline(lines: string[], path: string = '~', pause: number = 500): EventsOperator {
    return (queue: EventQueue): EventQueue => {
        const pipes = [];
        lines.forEach(line => {
            const c = line.startsWith('##') ? YELLOW : WHITE;
            queue = queue.pipe(
                pressNewLine(),
                prompt('root', path),
                pause(500),
                color(c),
                typeChars(line),
                color(WHITE),
                pause(pause)
            );
        });
        return queue;
    };
}
