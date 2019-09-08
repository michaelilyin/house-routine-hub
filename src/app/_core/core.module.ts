import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersModule} from '../_features/users/users.module';
import { VersionInfoDialogComponent } from './version/version-info-dialog/version-info-dialog.component';
import {MatButtonModule, MatDialogModule} from '@angular/material';



@NgModule({
  declarations: [
    VersionInfoDialogComponent
  ],
  imports: [
    CommonModule,
    UsersModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
  ],
  entryComponents: [
    VersionInfoDialogComponent
  ]
})
export class CoreModule { }
