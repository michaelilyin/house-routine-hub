import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {House} from '../../../_features/house/_models/house.model';
import {HouseService} from '../../../_features/house/_services/house.service';
import {first} from 'rxjs/operators';

@Injectable()
export class UserHousesResolver implements Resolve<House[]> {
  constructor(private housesService: HouseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<House[]> | Promise<House[]> | House[] {
    return this.housesService.observeCurrentUserHouses().pipe(first());
  }
}
