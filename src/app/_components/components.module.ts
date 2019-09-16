import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReferencesModule} from './references/references.module';
import { LockerComponent } from './locker/locker.component';



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ReferencesModule
  ]
})
export class ComponentsModule { }
