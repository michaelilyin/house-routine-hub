import {Injectable} from '@angular/core';
import {UsersModule} from '../users.module';
import {Authorization} from '../../../_core/auth/auth.model';
import {User} from '../_models/user.model';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {first, map, switchMap, tap} from 'rxjs/operators';

function patchUser(dest: Partial<User>, auth: Authorization): User {
  return {
    uid: dest.uid == undefined ? auth.uid : dest.uid,
    name: dest.name == undefined ? auth.displayName : dest.name,
    photoURL: dest.photoURL == undefined ? auth.photoURL : dest.photoURL
  };
}

@Injectable({
  providedIn: UsersModule
})
export class UsersService {

  constructor(private firestore: AngularFirestore) {
  }

  syncUserWithAuth(auth: Authorization): Observable<User> {
    const userDoc = this.firestore.doc<User>(`users/${auth.uid}`);
    return userDoc.get({source: 'server'}).pipe(
      first(),
      switchMap(shot => {
        const syncDest: Partial<User> = !shot.exists ? {} : shot.data();
        const user = patchUser(syncDest, auth);

        if (shot.exists) {
          return userDoc.update(user);
        } else {
          return userDoc.set(user);
        }
      }),
      switchMap(() => {
        return userDoc.valueChanges();
      })
    );
  }
}
