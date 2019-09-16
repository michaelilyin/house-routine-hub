import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LockerComponent} from './locker.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [LockerComponent],
  exports: [LockerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LockerModule { }
