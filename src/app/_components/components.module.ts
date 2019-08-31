import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReferencesModule} from './references/references.module';



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ReferencesModule
  ]
})
export class ComponentsModule { }
