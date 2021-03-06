import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { take } from 'rxjs/operators';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'shoppingApp';
  authin = true

  constructor(private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {

  }

  ngOnInit() {



    this.auth.user$.subscribe(user => {
      if (user) {
        let returnUrl = localStorage.getItem('retrunUrl')
        
        if (returnUrl) {        
          this.router.navigate([returnUrl])
          localStorage.removeItem('retrunUrl')
        }
      }
    })
  }



}
