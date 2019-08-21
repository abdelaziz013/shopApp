import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UserRoutingModule } from './user-routing.module';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { TrialComponent } from '../trial/trial.component';




@NgModule({
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    OrdersComponent,
    ProductFilterComponent,
    ProductCardComponent,
   
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
   
  ]
})
export class UserModule { }
