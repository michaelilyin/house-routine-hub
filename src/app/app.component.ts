import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map, shareReplay, first, mapTo, filter} from 'rxjs/operators';
import {AuthService} from './_core/auth/auth.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {VersionInfoDialogComponent} from './_core/version/version-info-dialog/version-info-dialog.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {IS_MOBILE} from './_shared/breakpoints/values';
import {LockerService} from './_components/locker/locker.service';
import {merge} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly auhResolved$ = this.authService.resolved$;

  readonly showMenu$ = this.breakpointObserver.observe(IS_MOBILE).pipe(
    map(state => state.matches),
    shareReplay(1)
  );

  constructor(private readonly authService: AuthService,
              private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly breakpointObserver: BreakpointObserver,
              private readonly lockerService: LockerService) {
    const routerLocks$ = merge(
      this.router.events.pipe(
        filter(event => event instanceof NavigationStart),
        mapTo(true)
      ),
      this.router.events.pipe(
        filter(event =>
          event instanceof NavigationEnd
          || event instanceof NavigationError
          || event instanceof NavigationCancel),
        mapTo(false)
      )
    );
    const authLocks$ = this.authService.resolved$.pipe(map(resolved => !resolved));
    merge(routerLocks$, authLocks$).subscribe((locked) => {
      if (locked) {
        this.lockerService.lock();
      } else {
        this.lockerService.unlock();
      }
    });


  }

  showVersion() {
    this.dialog.open(VersionInfoDialogComponent);
  }
}
