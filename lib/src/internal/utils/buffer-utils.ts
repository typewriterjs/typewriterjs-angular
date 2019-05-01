import {BufferEvent} from '../../core/events';

export function isFirstRow(b: BufferEvent): boolean {
    return b.row === 0;
}

export function isLastRow(b: BufferEvent): boolean {
    return b.row === b.text.length - 1;
}

export function isEndOfLine(b: BufferEvent): boolean {
    return b.column === b.text[b.row].length;
}

export function isStartOfLine(b: BufferEvent): boolean {
    return b.column === 0;
}

export function isOutOfRange(b: BufferEvent): boolean {
    return b.row < 0 || b.column < 0 || b.row > b.text.length - 1 || b.column > b.text[b.row].length;
}

export function isStartOfFile(b: BufferEvent): boolean {
    return isStartOfLine(b) && isFirstRow(b);
}

export function isEndOfFile(b: BufferEvent): boolean {
    return isEndOfLine(b) && isLastRow(b);
}

export function isEmptyFile(b: BufferEvent): boolean {
    return isStartOfFile(b) && isEndOfFile(b);
}
