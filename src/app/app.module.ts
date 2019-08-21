import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular7-data-table';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { UserService } from './user.service';
import { AdminGuard } from './auth/admin.guard';
import { TrialComponent } from './trial/trial.component';
import { CommonModule } from '@angular/common';



 






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    LoginComponent,
     TrialComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,     
    AngularFireModule.initializeApp(environment.firbase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,// imports firebase/storage only needed for storage features
    DataTableModule.forRoot(),
    CommonModule
    

  ],
  
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    UserService
  ],
  exports:[
    TrialComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
