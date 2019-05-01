import {isEndOfFile, isEndOfLine, isFirstRow, isLastRow, isOutOfRange, isStartOfLine} from '../../internal/utils/buffer-utils';
import {BufferEvent, CursorEvent} from '../events';

export function homeReducer(b: BufferEvent): BufferEvent {
    return isStartOfLine(b) ? b : {...b, column: 0};
}

export function endReducer(b: BufferEvent): BufferEvent {
    return isEndOfLine(b) ? b : {...b, column: b.text[b.row].length};
}

export function trimReducer(b: BufferEvent): BufferEvent {
    return isOutOfRange(b) ? endReducer(b) : b;
}

export function upReducer(b: BufferEvent): BufferEvent {
    return isFirstRow(b)
        ? homeReducer(b)
        : trimReducer({...b, row: b.row - 1});
}

export function downReducer(b: BufferEvent): BufferEvent {
    return isLastRow(b)
        ? endReducer(b)
        : trimReducer({...b, row: b.row + 1});
}

export function leftReducer(b: BufferEvent): BufferEvent {
    if (!isStartOfLine(b)) {
        return {...b, column: b.column - 1};
    }
    return endReducer(upReducer(b));
}

export function rightReducer(b: BufferEvent): BufferEvent {
    if (!isEndOfFile(b)) {
        return {...b, column: b.column + 1};
    }
    return homeReducer(downReducer(b));
}

export function cursorReducer(buffer: BufferEvent, event: CursorEvent): BufferEvent {
    if (event.direction === 'left') {
        return leftReducer(buffer);
    } else if (event.direction === 'right') {
        return rightReducer(buffer);
    } else if (event.direction === 'up') {
        return upReducer(buffer);
    } else if (event.direction === 'down') {
        return downReducer(buffer);
    } else if (event.direction === 'home') {
        return homeReducer(buffer);
    } else if (event.direction === 'end') {
        return endReducer(buffer);
    }
    throw new Error(`Invalid cursor move direction: ${event.direction}`);
}
