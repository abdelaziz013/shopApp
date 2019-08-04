import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ProductsComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
