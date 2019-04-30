import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'rg-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    host: {
        '[class.card]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
    @Input()
    public title: string;
}
