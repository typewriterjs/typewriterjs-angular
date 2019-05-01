import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    color,
    EventQueue,
    GREEN,
    pause,
    pressBackSpace,
    pressEnd,
    pressLeft,
    pressNewLine,
    speed,
    typeChars,
    WHITE
} from 'rg-animated-typing';

@Component({
    selector: 'rg-example-simple',
    templateUrl: './example-simple.component.html',
    styleUrls: ['./example-simple.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleSimpleComponent implements OnInit {
    public queue: EventQueue;

    public ngOnInit(): void {
        this.queue = EventQueue.create().pipe(
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
}
