import {ChangeDetectionStrategy, Component} from '@angular/core';
import {filter, first, map, shareReplay, switchMap} from 'rxjs/operators';
import {AuthService} from './_core/auth/auth.service';
import {Observable} from 'rxjs';
import {User} from './_features/users/_models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  user$: Observable<User> = this.authService.user$.pipe(shareReplay(1));
  authorized$: Observable<boolean> = this.user$.pipe(map(user => user != undefined));

  constructor(private authService: AuthService,
              private router: Router) {
  }

  login() {
    this.authService.login().pipe(
      switchMap(() => this.authorized$.pipe(
        filter(authorized => authorized),
        first()
      ))
    ).subscribe(() => {
      this.router.navigate(['.'])
    });
  }

  logout() {
    this.authService.logout().pipe(
      switchMap(() => this.authorized$.pipe(
        filter(authorized => !authorized),
        first()
      ))
    ).subscribe(() => {
      this.router.navigate(['.'])
    });
  }
}
