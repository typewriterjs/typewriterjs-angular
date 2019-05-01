import {EventType} from './event.type';

export interface BufferChar {
    char: string;
    color: number;
}

export interface BufferEvent extends EventType {
    color: number;
    column: number;
    row: number;
    text: BufferChar[][];
    type: 'buffer';
}

export function isBufferEvent(value: any): value is BufferEvent {
    return typeof value === 'object' && 'type' in value && value.type === 'buffer';
}
