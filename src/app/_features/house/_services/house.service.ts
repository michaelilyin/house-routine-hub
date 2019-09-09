import {Injectable} from '@angular/core';
import {HouseModule} from '../house.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of, throwError} from 'rxjs';
import {House} from '../_models/house.model';
import {AuthService} from '../../../_core/auth/auth.service';
import {first, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: HouseModule
})
export class HouseService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
  }

  getCurrentUserHouses(): Observable<House[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (user == undefined) {
          return of([]);
        }
        return this.firestore.collection<House>('houses', ref => {
          return ref.where('_users', 'array-contains', user.uid)
        }).valueChanges()
      })
    )
  }

  createHouse(house: House): Observable<void> {
    return this.authService.user$.pipe(
      first(),
      switchMap(user => {
        if (user == undefined) {
          return throwError("Unauthorized");
        }
        house._admins = [user.uid];
        house._users = [user.uid];
        house.uid = this.firestore.createId();

        return this.firestore.doc(`houses/${house.uid}`).set(house);
      })
    );
  }
}
