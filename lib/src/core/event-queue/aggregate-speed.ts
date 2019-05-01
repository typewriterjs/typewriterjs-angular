import {DelayEvent} from '../events/delay.event';
import {isSpeedEvent} from '../events/speed.event';

export function aggregateSpeed(events: DelayEvent[], fastForward: boolean): DelayEvent[] {
    const DEFAULT_SPEED = 15;
    let speed = DEFAULT_SPEED;
    return events.map(event => {
        if (isSpeedEvent(event)) {
            speed = typeof event.value === 'undefined' ? DEFAULT_SPEED : event.value;
            return null;
        }
        if (fastForward && (typeof event.delay === 'number' || typeof event.delay === 'undefined')) {
            return {...event, delay: 0};
        }
        const d = speed + Math.floor(Math.random() * Math.floor(speed));
        return Object.assign({delay: d}, event);
    }).filter(Boolean);
}
