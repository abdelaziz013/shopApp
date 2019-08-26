import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { CartItems } from './cart-items';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems$: Observable<CartItems[]>
  itemsQuantity

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cartItems$ = await this.cartService.getCartItems()
    this.cartItems$.subscribe(items => {
      this.itemsQuantity = 0
      items.forEach(item => {
        this.itemsQuantity += item.quantity
      })
    })

    
    this.cartItems$.subscribe(console.log)
  }



}
