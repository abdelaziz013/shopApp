import { Injectable } from '@angular/core';

// import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { User } from './model/user';
import { FirebaseDatabase } from '@angular/fire';

@Injectable()
export class UserService {

  constructor(private db:AngularFirestore) { }



  setUserData(user){
    const userRef:AngularFirestoreDocument <any>=this.db.doc(`users/${user.uid}`);
    const userData:User ={
      uid:user.uid,
      displayName:user.displayName,
      email:user.email
    }

    return userRef.set(userData,{merge:false})
  }

  get(uid){
    return this.db.doc<User>(`users/${uid}`).valueChanges()
  }

}
