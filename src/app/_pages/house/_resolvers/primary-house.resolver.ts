import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {House} from '../../../_features/house/_models/house.model';

@Injectable()
export class PrimaryHouseResolver implements Resolve<House | undefined> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<House | undefined> | Promise<House | undefined> | House | undefined {
    return undefined;
  }

}
