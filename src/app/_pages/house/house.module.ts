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
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {HouseResolver} from './_resolvers/house.resolver';
import {PrimaryHouseResolver} from './_resolvers/primary-house.resolver';
import {UserHousesResolver} from './_resolvers/user-houses.resolver';
import {InformationCardModule} from '../../_components/information-card/information-card.module';
import { HouseSettingsComponent } from './house-settings/house-settings.component';


@NgModule({
  declarations: [HouseComponent, PrimaryHousePageComponent, HousePageComponent, HouseDashboardComponent, CreateNewHousePageComponent, HouseSettingsComponent],
  imports: [
    CommonModule,
    HouseRoutingModule,
    HouseModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    InformationCardModule
  ],
  providers: [
    HouseResolver,
    PrimaryHouseResolver,
    UserHousesResolver
  ]
})
export class HousePagesModule { }
