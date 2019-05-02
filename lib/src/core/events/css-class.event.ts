import {DelayEvent} from './delay.event';

export interface CssClassEvent extends DelayEvent {
    type: 'css';
    value: string;
}

export function isCssClassEvent(value: any): value is CssClassEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'css';
}
