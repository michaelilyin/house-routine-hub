import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {House} from '../_models/house';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHousesResolver implements Resolve<House[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<House[]> | Promise<House[]> | House[] {
    return of([]);
  }
}
