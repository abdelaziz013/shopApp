import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
// import { Product } from '../../admin/admin-products/product';

import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCart } from '../../shopping-cart/shopping-cart';
import { Product } from 'src/app/admin/admin-products/product';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Input() ShoppingCart;
  item
  quantity
  productId$ = new Subject<Product["id"]>();

  constructor(private cartService: ShoppingCartService,
    private afs: AngularFirestore
  ) {

  }

  ngOnInit() {
    // get product quantity in cart
    this.cartService.getItemsQuantity(this.product.id).then(items => {
      items.get().subscribe(shopitem => {
        if (shopitem.exists) {
          this.quantity = shopitem.data().quantity
        } else {
          this.quantity = 0
        }
      })
    })

    // update product Quantity
    this.getQuantityUpdate().pipe(
      switchMap((id) => {
        let cartId = localStorage.getItem('cartId');
        return this.afs.doc<ShoppingCart>(`shoppingCart/${cartId}`)
          .collection('items')
          .doc<{ product: Product, quantity: string }>(`items${id}`)
          .valueChanges()
      })
    ).subscribe(product => {
      if (product) this.quantity = product.quantity
    })





  }
  // add product to Cart
  addToCart(product) {
    this.cartService.AddToCart(product)
    this.productId$.next(product.id)
  }

  async removeFromCart(product) {
    await this.cartService.removeFromCart(product)
    this.productId$.next(product.id)

  }


  // update quantity
  getQuantityUpdate() {
    return this.productId$.asObservable()
  }

}
