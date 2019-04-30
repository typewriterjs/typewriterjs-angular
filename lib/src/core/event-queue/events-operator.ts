import {EventQueue} from './event-queue';

export type EventsOperator = (queue: EventQueue) => EventQueue;
