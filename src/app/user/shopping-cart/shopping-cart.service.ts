import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCart } from './shopping-cart';
import { Product } from 'src/app/admin/admin-products/product';
import { take, map, switchMap } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';
import { CartItems } from './cart-items';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  q: number

  // productId$ = new Subject<Product["id"]>();

  constructor(private afs: AngularFirestore

  ) { }




  // create shoppingCart collection with date inside the document
  create() {
    return this.afs.collection('shoppingCart').add({
      dateCreated: new Date().getTime()
    })

  }

  // get cart items
  async getCartItems() {
    let cartId = await this.createOrGetCartId()
    return this.afs.doc(`shoppingCart/${cartId}`).collection<CartItems>('items').valueChanges()

  }

 

  // get one item
  getItem(cartId: string, productId: string) {
    return this.afs.doc<ShoppingCart>(`shoppingCart/${cartId}`)
      .collection('items').doc<CartItems>(`items${productId}`)
  }




  // get items quantity
  getItemsQuantity(productId) {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      let items = this.getItem(cartId, productId)
      return items;
    }


  }


  // get or create cartID
  async createOrGetCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    let result = await this.create();
    localStorage.setItem('cartId', result.id)
    return result.id;
  }

  // add product to cart
  async AddToCart(product: Product) {
    let cartId = await this.createOrGetCartId()
    // ref to item collection inside documents in shoppingCart collection
    let items = this.getItem(cartId, product.id)
    items.get().pipe(take(1)).subscribe(shopitem => {
      if (shopitem.exists) {
        items.update({ quantity: shopitem.data().quantity + 1 }).then(() => {
        })

      }
      else {
        items.set({ product: product, quantity: 1 })

      }
    })

  }

  // remove from cart
  async removeFromCart(product: Product) {
    let cartId = await this.createOrGetCartId()
    // ref to item collection inside documents in shoppingCart collection
    let items = this.getItem(cartId, product.id)
    items.get().pipe(take(1)).subscribe(shopitem => {
      if (shopitem.exists) {
        items.update({ quantity: shopitem.data().quantity - 1 })
        if (shopitem.data().quantity === 1) items.delete()
      }


      // else items.set({ product: product, quantity: 1 })
    })
  }



  // update quantity
  // getQuantityUpdate() {
  //   return this.productId$.asObservable()
  // }




}
