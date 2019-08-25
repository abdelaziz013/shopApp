import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCart } from './shopping-cart';
import { Product } from 'src/app/admin/admin-products/product';
import { take, map, switchMap } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore

  ) { }




  // create shoppingCart collection with date inside the document
  create() {
    return this.afs.collection('shoppingCart').add({
      dateCreated: new Date().getTime()
    })

  }

  // get cart
  async getCart() {
    let cartId = await this.createOrGetCartId()
    return this.afs.doc(`shoppingCart/${cartId}`).collection('items').valueChanges()

  }


  // get items
  getItem(cartId: string, productId: string) {
    return this.afs.doc<ShoppingCart>(`shoppingCart/${cartId}`)
      .collection('items').doc(`items${productId}`)
  }




  async getItemsQuantity(productId) {
    let cartId = await this.createOrGetCartId()
    let items = this.getItem(cartId, productId)
    return items;
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
      if (shopitem.exists) items.update({ quantity: shopitem.data().quantity + 1 })
      else items.set({ product: product, quantity: 1 })
    })

  }

  // remove from cart
  async removeFromCart(product: Product) {
    let cartId = await this.createOrGetCartId()
    // ref to item collection inside documents in shoppingCart collection
    let items = this.getItem(cartId, product.id)
    items.get().pipe(take(1)).subscribe(shopitem => {
      if (shopitem.exists) items.update({ quantity: shopitem.data().quantity - 1 })

      // else items.set({ product: product, quantity: 1 })
    })
  }








}
