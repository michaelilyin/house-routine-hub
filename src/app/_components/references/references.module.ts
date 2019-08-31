import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefSelectComponent } from './ref-select/ref-select.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [RefSelectComponent],
  exports: [
    RefSelectComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule
  ]
})
export class ReferencesModule { }
