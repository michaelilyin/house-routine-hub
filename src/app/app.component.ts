import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from './_core/auth/auth.service';
import {Observable} from 'rxjs';
import {User} from './_core/auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  user$: Observable<User> = this.authService.user$.pipe(shareReplay(1));
  authorized$: Observable<boolean> = this.user$.pipe(map(user => user != undefined));

  constructor(private authService: AuthService) {

  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
