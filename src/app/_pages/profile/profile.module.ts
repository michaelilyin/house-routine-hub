import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ComponentsModule} from '../../_components/components.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentsModule,
    MatFormFieldModule,
    FormsModule
  ]
})
export class ProfilePagesModule { }
