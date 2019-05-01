import {Observable} from 'rxjs';
import {EventType} from './event.type';

export interface DelayEvent extends EventType {
    delay?: number | Observable<any>;
}
