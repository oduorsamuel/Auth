import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

const appRoutes=[
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    
    path:'login', component: LoginComponent
  },
  {
    
    path:'home', component: HomeComponent
  },
  {
    
    path:'profile', component: ProfileComponent, canActivate:[AuthGuardService]
  },
  {
    
    path:'register', component: RegisterComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
    
  ],
  providers: [
    AuthenticationService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
