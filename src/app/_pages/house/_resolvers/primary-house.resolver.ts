import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {House} from '../../../_features/house/_models/house.model';
import {HouseService} from '../../../_features/house/_services/house.service';
import {first} from 'rxjs/operators';

@Injectable()
export class PrimaryHouseResolver implements Resolve<House | undefined> {
  constructor(private housesService: HouseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<House | undefined> | Promise<House | undefined> | House | undefined {
    return this.housesService.observeCurrentUserPrimaryHouse().pipe(first());
  }

}
