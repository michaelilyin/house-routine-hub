import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {APP_INITIALIZER, PLATFORM_ID, Provider} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';

export function authInitializer(authService: AuthService, platform: Object): () => Promise<User> {
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
