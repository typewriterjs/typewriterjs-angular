import {DelayEvent} from './delay.event';

export interface KeyPressEvent extends DelayEvent {
    type: 'key';
    value: string;
}

export function isKeyPressEvent(value: any): value is KeyPressEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'key';
}
