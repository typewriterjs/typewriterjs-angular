import {DelayEvent} from './delay.event';

export interface ColorEvent extends DelayEvent {
    type: 'color';
    value: number;
}

export function isColorEvent(value: any): value is ColorEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'color';
}
