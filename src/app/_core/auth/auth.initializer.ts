import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {APP_INITIALIZER, PLATFORM_ID, Provider} from '@angular/core';
import {AuthService} from './auth.service';
import {Authorization} from './auth.model';

export function authInitializer(authService: AuthService, platform: Object): () => Promise<Authorization> {
  return () => {
    return authService.user$.pipe(first()).toPromise();
  }
}

export const AUTH_INITIALIZER_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: authInitializer,
  deps: [AuthService, PLATFORM_ID],
  multi: true
};
