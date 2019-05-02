import {EventType} from './event.type';

export interface BufferChar {
    char: string;
    css: string;
}

export interface BufferEvent extends EventType {
    column: number;
    css: string;
    row: number;
    text: BufferChar[][];
    type: 'buffer';
}

export function isBufferEvent(value: any): value is BufferEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'buffer';
}
