import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { AdminGuard } from '../auth/admin.guard';

const routes: Routes = [
  {path:'products',component:AdminProductsComponent},
  {path:'orders',component:AdminOrdersComponent},
  {path:'product-form',component:ProductFormComponent},
  {path:'product-form/edit/:id',component:ProductFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
