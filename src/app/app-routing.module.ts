import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', canActivate: [AuthGuard], loadChildren: './user/user.module#UserModule' },
  { path: 'admin',loadChildren: './admin/admin.module#AdminModule' },
]
// 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
