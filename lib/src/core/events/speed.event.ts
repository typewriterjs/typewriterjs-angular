import {DelayEvent} from './delay.event';

export interface SpeedEvent extends DelayEvent {
    type: 'speed';
    value: number;
}

export function isSpeedEvent(value: any): value is SpeedEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'speed';
}
