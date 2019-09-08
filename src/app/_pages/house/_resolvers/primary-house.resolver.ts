import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {House} from '../_models/house';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimaryHouseResolver implements Resolve<House | undefined> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<House | undefined> | Promise<House | undefined> | House | undefined {
    return undefined;
  }

}
