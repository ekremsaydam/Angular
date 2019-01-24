import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { NgForm } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: User;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.model = new User();
  }

  login(form: NgForm) {
    this.accountService.login(this.model);

    console.log(this.model.username);
    console.log(this.model.password);
    console.log(this.accountService.isLoggedIn());

  }

}
