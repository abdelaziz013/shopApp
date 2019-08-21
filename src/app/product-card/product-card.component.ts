import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../admin/admin-products/product';
import { ShoppingCartService } from '../user/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    // let cartId = localStorage.getItem('cartId')
    // if (!cartId) {
    //   this.cartService.create().then(result => {
    //     localStorage.setItem('cartId', result.id)


    //   })
    // }

  }
}
