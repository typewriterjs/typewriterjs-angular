import {Observable, OperatorFunction} from 'rxjs';
import {filter, map, scan, startWith} from 'rxjs/operators';
import {isBackspaceEvent} from '../events/back-space.event';
import {BufferEvent, isBufferEvent} from '../events/buffer.event';
import {isColorEvent} from '../events/color.event';
import {isCursorEvent} from '../events/cursor.event';
import {DelayEvent} from '../events/delay.event';
import {isDeleteLineEvent} from '../events/delete-line.event';
import {isDeleteEvent} from '../events/delete.event';
import {isKeyPressEvent} from '../events/key-press.event';
import {isPauseEvent} from '../events/pause.event';
import {isSetEvent} from '../events/set.event';
import {isTapEvent, TapEvent} from '../events/tap.event';
import {WHITE} from '../operators/colors';
import {backspaceReducer} from './backspace.reducer';
import {colorReducer} from './color.reducer';
import {cursorReducer} from './cursor.reducer';
import {deleteLineReducer} from './delete-line.reducer';
import {deleteReducer} from './delete.reducer';
import {keyPressReducer} from './key-press.reducer';
import {setReducer} from './set.reducer';

/**
 * Appends a stream of keyboard events to the end of a buffer stream.
 */
export function eventsReducer(start?: Partial<BufferEvent>)
    : OperatorFunction<BufferEvent, BufferEvent> {

    const _default = {type: 'buffer', color: WHITE, column: 0, row: 0, text: []};
    const first = Object.assign(_default, start || {});

    return (source: Observable<DelayEvent>): Observable<BufferEvent> => {
        return source.pipe(
            map((event: DelayEvent) => {
                if (isPauseEvent(event)) {
                    return null;
                } else if (isTapEvent(event)) {
                    (event as TapEvent).callback();
                    return null;
                }
                return event;
            }),
            filter(Boolean),
            startWith(first),
            scan<DelayEvent, BufferEvent>((buffer, event) => {
                if (isBufferEvent(event)) {
                    return event;
                } else if (isKeyPressEvent(event)) {
                    return keyPressReducer(buffer, event);
                } else if (isCursorEvent(event)) {
                    return cursorReducer(buffer, event);
                } else if (isBackspaceEvent(event)) {
                    return backspaceReducer(buffer, event);
                } else if (isDeleteEvent(event)) {
                    return deleteReducer(buffer, event);
                } else if (isDeleteLineEvent(event)) {
                    return deleteLineReducer(buffer, event);
                } else if (isSetEvent(event)) {
                    return setReducer(buffer, event);
                } else if (isColorEvent(event)) {
                    return colorReducer(buffer, event);
                }
                throw new Error('unexpected value in buffer stream');
            })
        );
    };
}
