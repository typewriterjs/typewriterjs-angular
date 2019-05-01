import {DelayEvent} from './delay.event';

export interface TapEvent extends DelayEvent {
    callback: () => void;
    type: 'tap';
}

export function isTapEvent(value: any): value is TapEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'tap';
}
