import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthorizedGuard} from './_core/_guards/authorized.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./_pages/welcome/welcome.module').then(m => m.WelcomeModule)
  }, {
    path: 'profile',
    canActivate: [
      AuthorizedGuard
    ],
    loadChildren: () => import('./_pages/profile/profile.module').then(m => m.ProfileModule)
  }, {
    path: 'house',
    canActivate: [
      AuthorizedGuard
    ],
    loadChildren: () => import('./_pages/house/house.module').then(m => m.HouseModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
