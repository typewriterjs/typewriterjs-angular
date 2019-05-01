import {DelayEvent} from './delay.event';

export interface BackspaceEvent extends DelayEvent {
    type: 'backspace';
}

export function isBackspaceEvent(value: any): value is BackspaceEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'backspace';
}
