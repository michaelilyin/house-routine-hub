import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';



@NgModule({
  declarations: [
    UserAvatarComponent
  ],
  exports: [
    UserAvatarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
