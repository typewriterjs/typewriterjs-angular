import {Observable, OperatorFunction} from 'rxjs';
import {filter, map, scan, startWith} from 'rxjs/operators';
import {
    BufferEvent,
    DelayEvent,
    isBackspaceEvent,
    isBufferEvent,
    isCursorEvent,
    isDeleteEvent,
    isDeleteLineEvent,
    isKeyPressEvent,
    isPauseEvent,
    isSetEvent,
    isTapEvent,
    TapEvent
} from '../events';
import {isCssClassEvent} from '../events/css-class.event';
import {backspaceReducer} from './backspace.reducer';
import {cssClassReducer} from './css-class.reducer';
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

    const _default: BufferEvent = {type: 'buffer', css: '', column: 0, row: 0, text: []};
    const first: BufferEvent = Object.assign(_default, start || {});

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
                } else if (isCssClassEvent(event)) {
                    return cssClassReducer(buffer, event);
                }
                throw new Error('unexpected value in buffer stream');
            })
        );
    };
}
