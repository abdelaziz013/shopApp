import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
// import { Product } from '../../admin/admin-products/product';

import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Subject, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCart } from '../../shopping-cart/shopping-cart';
import { Product } from 'src/app/admin/admin-products/product';


@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product;
  @Input() ShoppingCart;
  items
  quantity  
  quantitySubscription: Subscription
  // productId$ = new Subject<Product["id"]>();


  constructor(private cartService: ShoppingCartService,
    private afs: AngularFirestore
  ) {

  }

  ngOnInit() {
    // get product quantity in cart
    // this.cartService.getItemsQuantity(this.product.id)
    //   .get().subscribe(shopitem => {
    //     if (shopitem.exists) {
    //       this.quantity = shopitem.data().quantity
    //     } else {
    //       this.quantity = 0
    //     }
    //   })


    // update product Quantity
    //  this.quantityUpdateSubscription= this.getQuantityUpdate().pipe(
    //     switchMap((id) => {
    //       let cartId = localStorage.getItem('cartId');
    //       return this.afs.doc<ShoppingCart>(`shoppingCart/${cartId}`)
    //         .collection('items')
    //         .doc<{ product: Product, quantity: string }>(`items${id}`)
    //         .valueChanges()
    //     })
    //   ).subscribe(product => {
    //     if (product) this.quantity = product.quantity
      
    //   })

this.quantitySubscription=this.cartService.getItemsQuantity(this.product.id)
.valueChanges().subscribe(shopitem => {
        if (shopitem) {
          this.quantity = shopitem.quantity
        } else {
          this.quantity = 0
        }
      })

  




  }
  // add product to Cart
  addToCart() {
    this.cartService.AddToCart(this.product)


  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product)
  }


  // update quantity
  // getQuantityUpdate() {
  //   return this.productId$.asObservable()
  // }

  ngOnDestroy() {
    this.quantitySubscription.unsubscribe()
  }

}
