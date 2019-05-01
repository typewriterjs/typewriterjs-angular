import {Observable, OperatorFunction} from 'rxjs';
import {filter, map, scan, startWith} from 'rxjs/operators';
import {isBackspaceEvent} from '../events/back-space.event';
import {BufferEvent, isBufferEvent} from '../events/buffer.event';
import {isColorEvent} from '../events/color.event';
import {isCursorEvent} from '../events/cursor.event';
import {DelayEvent} from '../events/delay.event';
import {isKeyPressEvent} from '../events/key-press.event';
import {isPauseEvent} from '../events/pause.event';
import {isSetEvent} from '../events/set.event';
import {isTapEvent, TapEvent} from '../events/tap.event';
import {WHITE} from '../operators/colors';
import {BackspaceReducer} from './backspace.reducer';
import {ColorReducer} from './color.reducer';
import {CursorMoveReducer} from './cursor-move.reducer';
import {KeyPressReducer} from './key-press.reducer';
import {SetReducer} from './set.reducer';

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
                    return KeyPressReducer(buffer, event);
                } else if (isCursorEvent(event)) {
                    return CursorMoveReducer(buffer, event);
                } else if (isBackspaceEvent(event)) {
                    return BackspaceReducer(buffer, event);
                } else if (isSetEvent(event)) {
                    return SetReducer(buffer, event);
                } else if (isColorEvent(event)) {
                    return ColorReducer(buffer, event);
                }
                throw new Error('unexpected value in buffer stream');
            })
        );
    };
}
