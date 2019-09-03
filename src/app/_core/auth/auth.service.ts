import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {User} from '../../_features/users/_models/user.model';
import {UsersService} from '../../_features/users/_services/users.service';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly user$: Observable<User | undefined> = this.firebaseAuth.user.pipe(
    switchMap(auth => {
      if (auth == undefined) {
        return of(undefined);
      }
      return this.usersService.syncUserWithAuth(auth);
    }),
    shareReplay(1)
  );

  constructor(private firebaseAuth: AngularFireAuth,
              private usersService: UsersService) {
  }

  login(): Observable<firebase.auth.UserCredential> {
    return fromPromise(this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  logout(): Observable<void> {
    return fromPromise(this.firebaseAuth.auth.signOut());
  }
}
