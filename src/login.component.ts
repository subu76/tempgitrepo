import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';
import { HarcodedAuthenticationService } from '../service/harcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username  = 'admin'
  password = ''
  invalidLogin = false
  errorMessage = 'Invalid Login Credentails'

  constructor(private router:Router, 
    private authService: HarcodedAuthenticationService ,
    private basicAuthService: BasicAuthenticationService) {
      
     }

  ngOnInit(): void {
  }


  handleLogin() {
    //console.log(this.username);
    //console.log("pwd"+ this.password);
    if(this.authService.authenticate(this.username, this.password)) {
      this.invalidLogin = false;
      console.log('valid');
    
      this.router.navigate(['welcome', this.username]);
    }
    else{
      console.log('invalid');
      this.invalidLogin = true;
      
    }
  }

  handleJwtAuthLogin() {
    //console.log(this.username);
    //console.log("pwd"+ this.password);
    this.basicAuthService.executeJwtAuthService(this.username, this.password).subscribe(
      data => {
        console.log(data);            
        this.router.navigate(['welcome', this.username]);
      },
      error=> {
        console.log('invalid');
        console.log(error);
        
        this.invalidLogin = true;
      }

    ) 
  }
  handleBasicAuthLogin() {
    //console.log(this.username);
    //console.log("pwd"+ this.password);
    this.basicAuthService.executeAuthService(this.username, this.password).subscribe(
      data => {
        console.log(data);            
        this.router.navigate(['welcome', this.username]);
      },
      error=> {
        console.log('invalid');
        console.log(error);
        
        this.invalidLogin = true;
      }

    ) 
  }
}
