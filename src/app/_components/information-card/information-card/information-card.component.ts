import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from '@angular/core';
import {Color} from '../../../_shared/theming/color';

@Component({
  selector: 'app-information-card',
  templateUrl: './information-card.component.html',
  styleUrls: ['./information-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationCardComponent implements OnInit {

  @Input()
  color: Color;

  constructor() {
  }

  ngOnInit() {
  }

  @HostBinding('class.primary')
  get primary() {
    return this.color == Color.primary;
  }

  @HostBinding('class.accent')
  get accent() {
    return this.color == Color.accent;
  }

  @HostBinding('class.warn')
  get warn() {
    return this.color == Color.warn;
  }
}
