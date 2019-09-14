import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of} from 'rxjs';
import {filter, first, map, mapTo, shareReplay, startWith, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {User} from '../../_features/users/_models/user.model';
import {UsersService} from '../../_features/users/_services/users.service';

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

  public readonly authorized$: Observable<boolean> = this.user$.pipe(
    map(user => user != undefined),
    shareReplay(1)
  );

  public readonly resolved$: Observable<boolean> = this.authorized$.pipe(
    first(),
    mapTo(true),
    startWith(false),
    shareReplay(1)
  );

  constructor(private firebaseAuth: AngularFireAuth,
              private usersService: UsersService) {
  }

  login(): Observable<boolean> {
    return from(this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
      switchMap(() => this.authorized$.pipe(
        filter(authorized => authorized),
        first()
      ))
    );
  }

  logout(): Observable<boolean> {
    return from(this.firebaseAuth.auth.signOut()).pipe(
      switchMap(() => this.authorized$.pipe(
        filter(authorized => !authorized),
        mapTo(true),
        first()
      ))
    );
  }
}
