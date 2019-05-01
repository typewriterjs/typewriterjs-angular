import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'rg-demo',
    templateUrl: './demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent {

}

