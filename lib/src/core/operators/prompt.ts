import {EventQueue} from '../event-queue/event-queue';
import {BLUE, GREEN, WHITE} from './colors';
import {EventsOperator} from '../event-queue/events-operator';
import {color} from './color';
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
