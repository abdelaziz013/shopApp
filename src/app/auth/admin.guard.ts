import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { isBoolean } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private auth: AuthService,
    private router: Router,


  ) { 



  }
  canActivate() {
    

    return this.auth.user$.pipe(     
      map(user =>  user.isAdmin?true:false                      
      //  if(user.isAdmin) return user.isAdmin 
      //   this.router.navigate(['/']);             
        
      )
        )   

  }



}
