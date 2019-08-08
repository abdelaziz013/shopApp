import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shoppingApp';

  constructor(private auth: AuthService,
              private router:Router,
              private userService: UserService
              )

  {
    auth.user$.subscribe(user=>{
      if(user){
        let returnUrl = localStorage.getItem('retrunUrl')
        this.router.navigate([returnUrl])
        userService.get(user.uid).subscribe(console.log)
      }
    })
  }

ngOnInit(){

}
}
