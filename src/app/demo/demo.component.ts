import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'rg-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent {
}
