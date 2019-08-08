import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user:User


  constructor( public authService: AuthService) {

  }

  ngOnInit() {
    this.authService.user$.subscribe(user=>{
      this.user =user
    })

  }
  logout() {
    this.authService.logOut()
  }
}
