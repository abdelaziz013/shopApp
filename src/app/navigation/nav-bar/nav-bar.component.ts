import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';
import { ShoppingCartService } from 'src/app/user/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'src/app/user/shopping-cart/shopping-cart';
import { CartItems } from 'src/app/user/shopping-cart/cart-items';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User
  cartItemsquantity


  constructor(public authService: AuthService,
    private cartService: ShoppingCartService

  ) {

  }

  async ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user
    })

    let cartItems = await this.cartService.getCartItems()
    cartItems.subscribe(items => {
      this.cartItemsquantity = 0
      items.forEach(item => {
        this.cartItemsquantity += item.quantity
      })
    }
    )




  }
  logout() {
    this.authService.logOut()
  }
}
