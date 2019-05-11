import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
    EventQueue,
    multiline,
    pressBackSpace,
    pressDelete,
    pressDeleteLine,
    pressDown,
    pressEnd,
    pressHome,
    pressLeft,
    pressNewLine,
    pressRight,
    pressUp,
    speed,
    typeChars
} from '@typewriterjs/typewriterjs';

@Component({
    selector: 'rg-example-insert',
    templateUrl: './example-insert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleInsertComponent implements OnInit {
    public queue: EventQueue;

    public ngOnInit() {
        this.queue = EventQueue.create().pipe(
            speed(25),
            multiline([
                'They put me in the oven to bake.',
                'Me, a deprived and miserable cake.',
                'Feeling the heat, I started to bubble.',
                'Watching the others, I knew I was in trouble.'
            ], {finishNewLine: false} /*{prePause: 500, endPause: 1000, finishNewLine: false}*/),
            speed(75),
            pressUp(3), pressBackSpace(5), typeChars('roast.'),
            pressDown(), pressLeft(19), pressBackSpace(8), typeChars('happy'),
            pressEnd(), pressBackSpace(15), typeChars('delicious toast.'), pressEnd(),
            pressNewLine(),
            typeChars('Looking around, I noticed I was brown.'),
            pressHome(), pressDown(), pressDeleteLine(),
            pressDelete(19), typeChars('If I stay too long'),
            pressRight(15), pressDelete(10), typeChars('going to breakdown'),
            pressEnd(),
            pressNewLine()
        );
    }
}
