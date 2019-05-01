import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {EventQueue} from '../../../lib/src/core/event-queue/event-queue';
import {multiline} from '../../../lib/src/core/operators/multiline';
import {pressBackSpace} from '../../../lib/src/core/operators/press-back-space';
import {pressDelete} from '../../../lib/src/core/operators/press-delete';
import {pressDeleteLine} from '../../../lib/src/core/operators/press-delete-line';
import {pressDown} from '../../../lib/src/core/operators/press-down';
import {pressEnd} from '../../../lib/src/core/operators/press-end';
import {pressHome} from '../../../lib/src/core/operators/press-home';
import {pressLeft} from '../../../lib/src/core/operators/press-left';
import {pressNewLine} from '../../../lib/src/core/operators/press-new-line';
import {pressRight} from '../../../lib/src/core/operators/press-right';
import {pressUp} from '../../../lib/src/core/operators/press-up';
import {speed} from '../../../lib/src/core/operators/speed';
import {typeChars} from '../../../lib/src/core/operators/type-chars';

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
            pressDelete(19), typeChars('If I stay to long'),
            pressRight(15), pressDelete(10), typeChars('going to breakdown'),
            pressEnd(),
            pressNewLine()
        );
    }
}
