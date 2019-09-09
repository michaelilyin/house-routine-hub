import {Component, Input, OnInit} from '@angular/core';
import {House} from '../../../_features/house/_models/house.model';

@Component({
  selector: 'app-house-dashboard',
  templateUrl: './house-dashboard.component.html',
  styleUrls: ['./house-dashboard.component.scss']
})
export class HouseDashboardComponent implements OnInit {

  @Input()
  public house: House;

  constructor() { }

  ngOnInit() {
  }

}
