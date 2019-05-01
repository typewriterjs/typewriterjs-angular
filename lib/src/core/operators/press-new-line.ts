import {EventsOperator} from '../event-queue';
import {typeChars} from './type-chars';

/**
 * Types a new line.
 */
export function pressNewLine(count: number = 1): EventsOperator {
    return typeChars('\r'.repeat(count));
}
