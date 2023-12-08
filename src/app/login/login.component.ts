import { Component } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent 
{
  user = new User();
  erreur =0;

  constructor(private authService : AuthService, 
              private  router: Router){

  }

  onLoggedin() 
  {     
    console.log(this.user);
    let isValidUser: Boolean = this.authService.SignIn(this.user); 
    if (isValidUser)      
      this.router.navigate(['/']);   
    else      
      //alert('Login ou mot de passe incorrecte!'); 
      this.erreur = 1;
  } 
 
}



