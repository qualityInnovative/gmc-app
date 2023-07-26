import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { Roles } from 'src/app/ratelist-models';
@Component({
  selector: 'ratelist-corporatemenu',
  templateUrl: './corporatemenu.component.html',
  styleUrls: ['./corporatemenu.component.scss']
})
export class CorporatemenuComponent implements OnInit {
  User: User = new User();
  Roles=Roles;


  constructor(
    public loginservice: LoginService
  ) { 
    this.User = this.loginservice.getLoggedInUser();
  }

  ngOnInit(): void {
  }

}
