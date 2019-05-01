import {DelayEvent} from './delay.event';

export interface SetEvent extends DelayEvent {
    type: 'set';
    value: string;
}

export function isSetEvent(value: any): value is SetEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'set';
}
