import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable, zip} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {House} from '../../../_features/house/_models/house.model';
import {HouseService} from '../../../_features/house/_services/house.service';

@Component({
  selector: 'app-primary-house-page',
  templateUrl: './primary-house-page.component.html',
  styleUrls: ['./primary-house-page.component.scss']
})
export class PrimaryHousePageComponent implements OnInit {

  readonly house$: Observable<House> = this.route.data.pipe(
    map(data => data.house as House | undefined),
    shareReplay(1)
  );

  readonly houses$: Observable<House[]> = this.route.data.pipe(
    map(data => data.houses as House[]),
    shareReplay(1)
  );

  readonly hasHouses$: Observable<boolean> = this.houses$.pipe(
    map(houses => houses.length > 0)
  );

  readonly primarySuggest$: Observable<House | undefined> = combineLatest(this.house$, this.houses$).pipe(
    map(([house, houses]) => {
      if (house != undefined || houses.length != 1) {
        return undefined;
      }
      return houses[0];
    })
  );

  constructor(private route: ActivatedRoute,
              private router: Router,
              private houseService: HouseService) {
  }

  ngOnInit() {
  }

  setPrimaryHouse(suggest: House) {
    this.houseService.savePrimaryHouseSettings({
      houseUid: suggest.uid
    }).subscribe(() => {
      this.router.navigate(['.'], {
        relativeTo: this.route
      })
    })
  }
}
