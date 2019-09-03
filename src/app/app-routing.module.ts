import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './_core/auth/auth.guard';
import {WelcomeGuard} from './_guards/welcome.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [
      WelcomeGuard
    ],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./_pages/welcome/welcome.module').then(m => m.WelcomeModule)
  }, {
    path: '',
    canActivate: [
      AuthGuard
    ],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'profile',
        loadChildren: () => import('./_pages/profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'house',
        loadChildren: () => import('./_pages/house/house.module').then(m => m.HouseModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
