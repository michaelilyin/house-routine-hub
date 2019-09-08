import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {firebase} from '../environments/firebase';
import {CoreModule} from './_core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ProfileModule} from './_features/profile/profile.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {MatProgressSpinnerModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    ProfileModule,
    MatDividerModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
