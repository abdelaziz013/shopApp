import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { analyzeAndValidateNgModules, identifierModuleUrl } from '@angular/compiler';
import { database } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {



  constructor(private afs: AngularFirestore) {

  }





  getCategories(){
    return this.afs.collection('categories', ref => ref.orderBy('name'))
      .snapshotChanges().pipe(
        map(snapshot => {
          return snapshot.map(doc => {          
            return{
              data:doc.payload.doc.data(),
              id:doc.payload.doc.id
            }

          })

        }

        )

      )
  }

}
