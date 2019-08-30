import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
