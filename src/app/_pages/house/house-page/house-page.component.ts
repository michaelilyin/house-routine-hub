import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {House} from '../../../_features/house/_models/house.model';

@Component({
  selector: 'app-house-page',
  templateUrl: './house-page.component.html',
  styleUrls: ['./house-page.component.scss']
})
export class HousePageComponent implements OnInit {

  readonly house$: Observable<House> = this.route.data.pipe(
    map(data => data.house as House | undefined),
    shareReplay(1)
  );

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
