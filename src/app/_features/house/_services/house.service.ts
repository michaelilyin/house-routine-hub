import {Injectable} from '@angular/core';
import {HouseModule} from '../house.module';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of, throwError} from 'rxjs';
import {House, HouseInfra, PrimaryHouseSettings} from '../_models/house.model';
import {AuthService} from '../../../_core/auth/auth.service';
import {first, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: HouseModule
})
export class HouseService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
  }

  observeCurrentUserHouses(): Observable<House[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (user == undefined) {
          return of([]);
        }
        return this.firestore.collection<HouseInfra>('houses', ref => {
          return ref.where('_users', 'array-contains', user.uid)
        }).valueChanges()
      })
    )
  }

  observeCurrentUserPrimaryHouse(): Observable<House> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (user == undefined) {
          return throwError("Unauthorized");
        }
        return this.firestore.doc<PrimaryHouseSettings>(`users/${user.uid}/settings/primary`).valueChanges();
      }),
      switchMap(userHouse => {
        if (userHouse == undefined || userHouse.houseUid == undefined) {
          return of(undefined);
        }
        return this.observeHouse(userHouse.houseUid);
      })
    );
  }

  observeHouse(uid: string): Observable<House> {
    return this.firestore.doc<HouseInfra>(`houses/${uid}`).valueChanges();
  }

  createHouse(house: House): Observable<void> {
    return this.authService.user$.pipe(
      first(),
      switchMap(user => {
        if (user == undefined) {
          return throwError("Unauthorized");
        }
        const uid = this.firestore.createId();
        const model: HouseInfra = {
          ...house,
          uid,
          _admins: [user.uid],
          _users: [user.uid]
        };

        return this.firestore.doc(`houses/${uid}`).set(model);
      })
    );
  }

  savePrimaryHouseSettings(settings: PrimaryHouseSettings): Observable<void> {
    return this.authService.user$.pipe(
      first(),
      switchMap(user => {
        if (user == undefined) {
          return throwError("Unauthorized");
        }

        return this.firestore.doc(`users/${user.uid}/settings/primary`).set(settings);
      })
    );
  }
}
