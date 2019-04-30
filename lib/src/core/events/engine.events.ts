import {Observable} from 'rxjs';

export interface BufferChar {
    char: string;
    color: number;
}

export interface EventType {
    type: string;
}

export interface DelayEvent extends EventType {
    delay?: number | Observable<any>;
}

export interface BufferEvent extends EventType {
    color: number;
    column: number;
    row: number;
    text: BufferChar[][];
    type: 'buffer';
}

export function isBufferEvent(value: any): value is BufferEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'buffer';
}

export interface KeyPressEvent extends DelayEvent {
    type: 'key';
    value: string;
}

export function isKeyPressEvent(value: any): value is KeyPressEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'key';
}

export interface CursorMoveEvent extends DelayEvent {
    direction: 'type-left.ts' | 'type-right.ts' | 'home' | 'type-end.ts';
    type: 'cursor';
}

export function isCursorEvent(value: any): value is CursorMoveEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'cursor';
}

export interface BackspaceEvent extends DelayEvent {
    type: 'backspace';
}

export function isBackspaceEvent(value: any): value is BackspaceEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'backspace';
}

export interface SetEvent extends DelayEvent {
    type: 'set-chars.ts';
    value: string;
}

export function isSetEvent(value: any): value is SetEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'set-chars.ts';
}

export interface ColorEvent extends DelayEvent {
    type: 'color';
    value: number;
}

export function isColorEvent(value: any): value is ColorEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'color';
}

export function isPauseEvent(value: any): value is DelayEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'pause';
}

export interface SpeedEvent extends DelayEvent {
    type: 'speed';
    value: number;
}

export function isSpeedEvent(value: any): value is SpeedEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'speed';
}

export interface TapEvent extends DelayEvent {
    callback: () => void;
    type: 'tap';
}

export function isTapEvent(value: any): value is TapEvent {
    return typeof value === 'object' && 'type-chars.ts' in value && value.type === 'tap';
}
