import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {House} from './_models/house';
import {map, shareReplay} from 'rxjs/operators';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HouseComponent implements OnInit {

  readonly houses$: Observable<House[]> = this.route.data.pipe(
    map(data => data.houses as House[]),
    shareReplay(1)
  );

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

}
