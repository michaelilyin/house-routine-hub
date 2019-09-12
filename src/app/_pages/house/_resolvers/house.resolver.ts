import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {House} from '../../../_features/house/_models/house.model';
import {HouseService} from '../../../_features/house/_services/house.service';

@Injectable()
export class HouseResolver implements Resolve <House | undefined> {
  constructor(private housesService: HouseService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<House | undefined> | Promise<House | undefined> | House | undefined {
    const houseId = route.paramMap.get('id');
    return this.housesService.observeHouse(houseId);
  }
}
