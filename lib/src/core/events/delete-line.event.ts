import {DelayEvent} from './delay.event';

export interface DeleteLineEvent extends DelayEvent {
    type: 'delete-line';
}

export function isDeleteLineEvent(value: any): value is DeleteLineEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'delete-line';
}
