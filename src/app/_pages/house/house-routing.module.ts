import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HouseComponent} from './house.component';
import {UserHousesResolver} from './_resolvers/user-houses.resolver';
import {PrimaryHouseResolver} from './_resolvers/primary-house.resolver';
import {PrimaryHousePageComponent} from './primary-house-page/primary-house-page.component';
import {HousePageComponent} from './house-page/house-page.component';
import {HouseResolver} from './_resolvers/house.resolver';
import {CreateNewHousePageComponent} from './create-new-house-page/create-new-house-page.component';
import {HouseSettingsComponent} from './house-settings/house-settings.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      houses: UserHousesResolver
    },
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'new',
        component: CreateNewHousePageComponent
      },
      {
        path: '',
        component: HouseComponent,
        children: [
          {
            path: '',
            resolve: {
              house: PrimaryHouseResolver
            },
            runGuardsAndResolvers: 'always',
            component: PrimaryHousePageComponent
          },
          {
            path: ':id',
            resolve: {
              house: HouseResolver
            },
            runGuardsAndResolvers: 'always',
            children: [
              {
                path: '',
                component: HousePageComponent
              },
              {
                path: 'settings',
                component: HouseSettingsComponent
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
