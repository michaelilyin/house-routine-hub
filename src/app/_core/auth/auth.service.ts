import {APP_INITIALIZER, Injectable, Provider, Inject, PLATFORM_ID, OnDestroy, Optional, Injector} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable, of, Subscription} from 'rxjs';
import {filter, first, map, mapTo, shareReplay, startWith, switchMap} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {User} from '../../_features/users/_models/user.model';
import {UsersService} from '../../_features/users/_services/users.service';
import {isPlatformServer} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

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

  // TODO: resolved false when login/logout
  public readonly resolved$: Observable<boolean> = this.authorized$.pipe(
    first(),
    mapTo(true),
    startWith(false),
    shareReplay(1)
  );

  private tokenSub = Subscription.EMPTY;

  constructor(public readonly firebaseAuth: AngularFireAuth,
              private usersService: UsersService,
              private cookieService: CookieService) {
    this.tokenSub = this.firebaseAuth.user.pipe(
      switchMap(auth => {
        if (auth == undefined) {
          return of(undefined);
        }
        return auth.getIdToken();
      })
    ).subscribe(token => {
      if (token) {
        this.cookieService.set("__session", token);
      } else {
        this.cookieService.delete("__session");
      }
    });
  }

  ngOnDestroy(): void {
    this.tokenSub.unsubscribe();
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

export function authInitializer(service: AuthService, platform: Object, injector: Injector): () => Promise<boolean> {
  function parseToken(cookie: string | undefined): string | undefined {
    if (!cookie) return undefined;
    const match = /_session=(.*)/.exec(cookie);
    if (!match) return undefined;
    return match[1];
  }

  return () => {
    let pipeline: Promise<any> = isPlatformServer(platform)
      ? service.firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
      : service.firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    // if (isPlatformServer(platform)) {
    //   console.info('Is server, try to auth');
      // const req = injector.get('REQUEST');
      // const cookie = req.get('cookie');
      // if (cookie) {
      //   console.info('Has cookie, authenticate with it');
      //   const token = parseToken(cookie);
      //   pipeline = pipeline.then(() => service.firebaseAuth.auth.signInWithCustomToken(token));
      // } else {
      //   console.info('Cookie not exists');
      // }
    // }
    return pipeline.then(() => service.resolved$.pipe(filter(resolved => resolved === true)).toPromise());
  }
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  deps: [AuthService, PLATFORM_ID, Injector],
  multi: true
};
