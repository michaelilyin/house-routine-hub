import {ChangeDetectionStrategy, Component} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from './_core/auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {VersionInfoDialogComponent} from './_core/version/version-info-dialog/version-info-dialog.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {IS_MOBILE} from './_shared/breakpoints/values';

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
              private readonly breakpointObserver: BreakpointObserver) {
  }

  showVersion() {
    this.dialog.open(VersionInfoDialogComponent);
  }
}
