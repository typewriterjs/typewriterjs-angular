import {DelayEvent} from './delay.event';

export function isPauseEvent(value: any): value is DelayEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'pause';
}
