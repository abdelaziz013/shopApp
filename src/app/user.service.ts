import { Injectable } from '@angular/core';

// import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { User } from './model/user';
import { FirebaseDatabase } from '@angular/fire';

@Injectable()
export class UserService {

  constructor(private db:AngularFirestore) { }



 

  get(uid){
    return this.db.doc<User>(`users/${uid}`).valueChanges()
  }

}
