import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AUTH_INITIALIZER_PROVIDER} from './_initializer/auth.initializer';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AUTH_INITIALIZER_PROVIDER
  ]
})
export class CoreModule { }
