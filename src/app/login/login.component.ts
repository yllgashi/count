import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUsername;
  loginPassword;
  loginRouterLink = "";

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome() {
    if(this.loginUsername == "admin" && this.loginPassword == "admin") {
      this._router.navigateByUrl('/home');
    }
    else {
      alert("Incorrect! Try Again.");
    }
  }

}
