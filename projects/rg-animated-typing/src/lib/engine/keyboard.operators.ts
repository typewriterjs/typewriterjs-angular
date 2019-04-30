import {Observable} from 'rxjs';
import {EngineAnimation} from './engine-animation';
import {EngineEvents} from './engine.events';

export namespace Keyboard {
    export const WHITE = 0;
    export const GREEN = 1;
    export const BLUE = 2;
    export const YELLOW = 3;
    export const RED = 4;

    export type EventsOperator = (queue: EngineAnimation) => EngineAnimation;

    export function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Types a sequence of characters and moves the cursor forward.
     */
    export function type(characters: string): EventsOperator {
        return _reduceEvents(() => characters.split('').map(value => ({type: 'key', value})));
    }

    /**
     * Sets the current color for text.
     */
    export function color(value: number): EventsOperator {
        return _reduceEvents(() => [{type: 'color', value, delay: 0}]);
    }

    /**
     * Inserts a string immediately into the buffer without a delay.
     */
    export function set(value: string): EventsOperator {
        return _reduceEvents(() => {
            return escapeHtml(value).split(/({{\d}})/).map(str => {
                const m = str.match(/{{(\d)}}/);
                return m
                    ? {type: 'color', value: parseInt(m[1], 10), delay: 0}
                    : {type: 'set', value: str, delay: 0};
            });
        });
    }

    /**
     * Types a new line.
     */
    export function newLine(count: number = 1): EventsOperator {
        return type('\r'.repeat(count));
    }

    /**
     * Moves the cursor to the left.
     */
    export function left(count: number = 1): EventsOperator {
        return _reduceEvents(() => Array(count).fill(null).map(() => ({type: 'cursor', direction: 'left'})));
    }

    /**
     * Moves the cursor to the right.
     */
    export function right(count: number = 1): EventsOperator {
        return _reduceEvents(() => Array(count).fill(null).map(() => ({type: 'cursor', direction: 'right'})));
    }

    /**
     * Moves the cursor to the start of the line.
     */
    export function home(): EventsOperator {
        return _reduceEvents(() => [{type: 'cursor', direction: 'home'}]);
    }

    /**
     * Moves the cursor to the end of the line.
     */
    export function end(): EventsOperator {
        return _reduceEvents(() => [{type: 'cursor', direction: 'end'}]);
    }

    /**
     * Deletes a character to the left.
     */
    export function backSpace(count: number = 1): EventsOperator {
        return _reduceEvents(() => Array(count).fill(null).map(() => ({type: 'backspace'})));
    }

    /**
     * Adds a delay to the buffer stream.
     */
    export function pause(delay: number | Observable<any> = 1000): EventsOperator {
        return _reduceEvents(() => [{type: 'pause', delay}]);
    }

    /**
     * Changes the playback speed.
     */
    export function speed(value?: number): EventsOperator {
        return _reduceEvents(() => [{type: 'speed', value}]);
    }

    /**
     * Triggers the callback when the stream is played
     */
    export function tap(callback: Function) {
        return _reduceEvents(() => [{type: 'tap', callback}]);
    }

    function _reduceEvents(events: () => EngineEvents.DelayEvent[]): EventsOperator {
        return function(queue: EngineAnimation): EngineAnimation {
            return events().reduce((acc, next) => acc.append(next), queue);
        };
    }
}
