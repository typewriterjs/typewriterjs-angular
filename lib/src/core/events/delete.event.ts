import {DelayEvent} from './delay.event';

export interface DeleteEvent extends DelayEvent {
    type: 'delete';
}

export function isDeleteEvent(value: any): value is DeleteEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'delete';
}
