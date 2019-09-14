import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationCardComponent } from './information-card/information-card.component';
import {MatCardModule} from '@angular/material';



@NgModule({
  declarations: [
    InformationCardComponent
  ],
  exports: [
    InformationCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class InformationCardModule { }
