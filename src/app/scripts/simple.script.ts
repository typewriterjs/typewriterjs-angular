import {EventQueue} from '../../../lib/src/core/event-queue/event-queue';
import {color} from '../../../lib/src/core/operators/color';
import {GREEN, WHITE} from '../../../lib/src/core/operators/colors';
import {pause} from '../../../lib/src/core/operators/pause';
import {pressBackSpace} from '../../../lib/src/core/operators/press-back-space';
import {pressEnd} from '../../../lib/src/core/operators/press-end';
import {pressLeft} from '../../../lib/src/core/operators/press-left';
import {pressNewLine} from '../../../lib/src/core/operators/press-new-line';
import {speed} from '../../../lib/src/core/operators/speed';
import {typeChars} from '../../../lib/src/core/operators/type-chars';

export function simpleScript(): EventQueue {
    return EventQueue.create().pipe(
        speed(25),
        typeChars('Hello,'),
        pause(1000),
        pressNewLine(), pause(500),
        typeChars('This is a simple example of text being typed on the screen.'),
        pause(1000),
        pressNewLine(), pause(500),
        typeChars('The text can be written'),
        speed(300),
        typeChars(' slowly '),
        pause(1000),
        speed(5),
        typeChars('or very quickly.'),
        pause(1000),
        speed(25),
        pressNewLine(), pause(500),
        typeChars('The '), color(GREEN), typeChars('style'), color(WHITE), typeChars(' of the text can also be changed.'),
        pressNewLine(), pause(500),
        typeChars('The cursor can move and make changes to previous text.'),
        pause(500),
        pressLeft(15),
        pause(500),
        pressBackSpace(15),
        pause(500),
        speed(200), typeChars('modify the'), speed(25),
        pause(500),
        pressEnd(), pause(500),
        pressNewLine(), pause(500),
        typeChars('Try some of the other samples!')
    );
}
