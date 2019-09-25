import {APP_INITIALIZER, Injectable, Provider, Inject, PLATFORM_ID, OnDestroy} from '@angular/core';
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
          return undefined;
        }
        const token$ = auth.getIdToken();
        if (token$ != undefined) {
          return token$;
        }
        return of(undefined);
      })
    ).subscribe(token => {
      if (token) {
        this.cookieService.set("_token", token);
      } else {
        this.cookieService.delete("_token");
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

export function authInitializer(service: AuthService, platform: Object, cookieService: CookieService): () => Promise<boolean> {
  return () => {
    let pipeline = isPlatformServer(platform)
      ? service.firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.NONE)
      : service.firebaseAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    if (isPlatformServer(platform)) {
      console.info('Is server, try to auth');
      if (cookieService.check("_token")) {
        console.info('Has cookie, authenticate with it');
        const token = cookieService.get("_token");
        pipeline.then(() => service.firebaseAuth.auth.signInWithCustomToken(token));
      }
    }
    return pipeline.then(() => service.resolved$.pipe(filter(resolved => resolved === true)).toPromise());
  }
}

export const AUTH_INITIALIZER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  deps: [AuthService, PLATFORM_ID, CookieService],
  multi: true
};
