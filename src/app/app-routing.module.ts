import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { TrialComponent } from './trial/trial.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'admin' ,canActivate: [AuthGuard],loadChildren: './admin/admin.module#AdminModule' },
  { path: 'log', component: TrialComponent },
  

  


]
// 
@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:"reload"})],
  exports: [RouterModule]


})
export class AppRoutingModule { }
