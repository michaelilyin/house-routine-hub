import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersModule} from '../_features/users/users.module';
import { VersionInfoDialogComponent } from './version/version-info-dialog/version-info-dialog.component';
import {MatButtonModule, MatDialogModule, MatDividerModule, MatMenuModule} from '@angular/material';
import { UserMenuComponent } from './user-menu/user-menu.component';
import {ProfileModule} from '../_features/profile/profile.module';
import {RouterModule} from '@angular/router';
import {EXCEPTION_HANDLER_PROVIDER} from './exception-handler/exception-handler';



@NgModule({
  declarations: [
    VersionInfoDialogComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    UsersModule,
    MatDialogModule,
    MatButtonModule,
    ProfileModule,
    MatDividerModule,
    MatMenuModule,
    RouterModule
  ],
  providers: [
    EXCEPTION_HANDLER_PROVIDER
  ],
  exports: [
    UserMenuComponent
  ],
  entryComponents: [
    VersionInfoDialogComponent
  ]
})
export class CoreModule { }
