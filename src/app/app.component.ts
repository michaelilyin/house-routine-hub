import {ChangeDetectionStrategy, Component} from '@angular/core';
import {filter, first, map, mapTo, shareReplay, startWith, switchMap} from 'rxjs/operators';
import {AuthService} from './_core/auth/auth.service';
import {Observable} from 'rxjs';
import {User} from './_features/users/_models/user.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {VersionInfoDialogComponent} from './_core/version/version-info-dialog/version-info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  user$: Observable<User> = this.authService.user$.pipe(shareReplay(1));
  authorized$: Observable<boolean> = this.user$.pipe(map(user => user != undefined));
  authComputed$: Observable<boolean> = this.authorized$.pipe(
    mapTo(false),
    startWith(false),
    shareReplay(1)
  );

  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog) {
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

  showVersion() {
    this.dialog.open(VersionInfoDialogComponent);
  }
}
