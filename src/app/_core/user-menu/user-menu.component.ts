import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent implements OnInit {
  readonly user$ = this.authService.user$;
  readonly authorized$ = this.authService.authorized$;


  constructor(private readonly authService: AuthService,
              private readonly router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login().subscribe(() => {
      this.router.navigate(['.'])
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['.'])
    });
  }

}
