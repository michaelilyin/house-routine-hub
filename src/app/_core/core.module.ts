import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AUTH_INITIALIZER_PROVIDER} from './auth/auth.initializer';
import {UsersModule} from '../_features/users/users.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersModule
  ],
  providers: [
    AUTH_INITIALIZER_PROVIDER
  ]
})
export class CoreModule { }
