import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
 import { DataTableModule } from 'angular7-data-table';



@NgModule({
  declarations: [AdminProductsComponent, AdminOrdersComponent, ProductFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    CustomFormsModule,
   

    DataTableModule.forRoot()
  ]
})
export class AdminModule { }
