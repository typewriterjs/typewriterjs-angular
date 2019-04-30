import {Observable, OperatorFunction} from 'rxjs';
import {filter, map, scan, startWith} from 'rxjs/operators';
import {EngineEvents} from './engine.events';
import {Keyboard} from './keyboard.operators';
import {BackspaceReducer} from './reducers/backspace.reducer';
import {ColorReducer} from './reducers/color.reducer';
import {CursorMoveReducer} from './reducers/cursor-move.reducer';
import {KeyPressReducer} from './reducers/key-press.reducer';
import {SetReducer} from './reducers/set.reducer';

/**
 * Appends a stream of keyboard events to the end of a buffer stream.
 */
export function reduceEvents(start?: Partial<EngineEvents.BufferEvent>)
    : OperatorFunction<EngineEvents.BufferEvent, EngineEvents.BufferEvent> {

    const _default = {type: 'buffer', color: Keyboard.WHITE, column: 0, row: 0, text: []};
    const first = Object.assign(_default, start || {});

    return (source: Observable<EngineEvents.DelayEvent>): Observable<EngineEvents.BufferEvent> => {
        return source.pipe(
            map((event: EngineEvents.DelayEvent) => {
                if (EngineEvents.isPauseEvent(event)) {
                    return null;
                } else if (EngineEvents.isTapEvent(event)) {
                    (<EngineEvents.TapEvent> event).callback();
                    return null;
                }
                return event;
            }),
            filter(Boolean),
            startWith(first),
            scan<EngineEvents.DelayEvent, EngineEvents.BufferEvent>((buffer, event) => {
                if (EngineEvents.isBufferEvent(event)) {
                    return event;
                } else if (EngineEvents.isKeyPressEvent(event)) {
                    return KeyPressReducer(buffer, event);
                } else if (EngineEvents.isCursorEvent(event)) {
                    return CursorMoveReducer(buffer, event);
                } else if (EngineEvents.isBackspaceEvent(event)) {
                    return BackspaceReducer(buffer, event);
                } else if (EngineEvents.isSetEvent(event)) {
                    return SetReducer(buffer, event);
                } else if (EngineEvents.isColorEvent(event)) {
                    return ColorReducer(buffer, event);
                }
                throw new Error('unexpected value in buffer stream');
            })
        );
    };
}
