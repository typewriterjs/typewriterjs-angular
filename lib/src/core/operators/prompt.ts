import {EventQueue, EventsOperator} from '../event-queue';
import {color} from './color';
import {BLUE, GREEN, WHITE} from './colors';
import {setChars} from './set-chars';

export function prompt(domain: string, path: string): EventsOperator {
    return (queue: EventQueue): EventQueue => {
        return queue.pipe(
            color(GREEN),
            setChars(domain),
            color(WHITE),
            setChars(':'),
            color(BLUE),
            setChars(path),
            color(WHITE),
            setChars('$ ')
        );
    };
}
