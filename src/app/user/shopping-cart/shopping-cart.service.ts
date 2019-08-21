import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCart } from './shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore) { }


  private create() {
    return this.afs.collection<ShoppingCart>('shoppingCart').add({
      dateCreated: new Date().getTime()
    })
  }



  private createOrgetCart() {
    let cartId = localStorage.getItem('cartID');
    if (!cartId) {
      this.create().then(result => {
        localStorage.setItem('cartId', result.id)
      })

    } else {

    }

  }
}
