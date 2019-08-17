import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

import { Observable, of, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import * as firebase from "firebase";
import { User } from "../model/user";
import { switchMap } from "rxjs/operators";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";

@Injectable()
export class AuthService {
  userData: any;
  user$: Observable<User>;
  private authStatusListenr = new Subject<boolean>();

  constructor(
    private afauth: AngularFireAuth,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.updateUserData(user);
          this.authStatusListenr.next(true);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("retrunUrl", returnUrl);
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afauth.auth.signInWithRedirect(provider);
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email
    };
    return userRef.set(userData, { merge: true });
  }

  logOut() {
    this.afauth.auth.signOut();
  }

  getAuthStatusListener() {
    return this.authStatusListenr.asObservable();
  }
}
