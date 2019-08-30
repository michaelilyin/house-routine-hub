import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {User} from './user.model';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly user$: Observable<User> = this.firebaseAuth.user.pipe(
    shareReplay(1)
  );

  constructor(private firebaseAuth: AngularFireAuth) { }

  login() {
    this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }
}
