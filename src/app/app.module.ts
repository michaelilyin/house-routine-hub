import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDKNUWbT1ciLI5onf7GjFJ1OS_pToKuJAQ",
      authDomain: "hdh-dev.firebaseapp.com",
      databaseURL: "https://hdh-dev.firebaseio.com",
      projectId: "hdh-dev",
      storageBucket: "",
      messagingSenderId: "1092755768393",
      appId: "1:1092755768393:web:3425a39171c129ef"
    }),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
