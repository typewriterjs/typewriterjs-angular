import {DelayEvent} from './delay.event';

export interface CursorEvent extends DelayEvent {
    direction: 'left' | 'right' | 'home' | 'end';
    type: 'cursor';
}

export function isCursorEvent(value: any): value is CursorEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'cursor';
}
