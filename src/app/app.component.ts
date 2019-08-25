import { Component } from '@angular/core';
import {version} from '../environments/version';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { tap  } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hrh';
  version = version;

  user$ = this.authService.user.pipe(tap((auth) => console.info('auth:', auth)));

  constructor(private authService: AngularFireAuth) {

  }

  authGoogle() {
    this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  logout() {
    this.authService.auth.signOut();
  }
}
