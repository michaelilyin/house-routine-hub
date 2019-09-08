import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { HouseComponent } from './house.component';
import {HouseModule} from '../../_features/house/house.module';
import { PrimaryHousePageComponent } from './primary-house-page/primary-house-page.component';
import { HousePageComponent } from './house-page/house-page.component';
import { HouseDashboardComponent } from './house-dashboard/house-dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CreateNewHousePageComponent } from './create-new-house-page/create-new-house-page.component';


@NgModule({
  declarations: [HouseComponent, PrimaryHousePageComponent, HousePageComponent, HouseDashboardComponent, CreateNewHousePageComponent],
  imports: [
    CommonModule,
    HouseRoutingModule,
    HouseModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class HousePagesModule { }
