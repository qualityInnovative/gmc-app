import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { ActivatedRoute } from '@angular/router';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { Corporation } from 'src/app/models/corporation';
import { Roles } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import { Location } from '@angular/common';
@Component({
  selector: 'ratelist-addcorporateuser',
  templateUrl: './addcorporateuser.component.html',
  styleUrls: ['./addcorporateuser.component.scss']
})
export class AddcorporateuserComponent implements OnInit {
  Roles = Roles;
  edit: boolean = false;
  loggedinUser: User = new User();
  User: User = new User();
  corporations: Corporation[] = [];
  constructor(
    public lo: LoginService,
    public route: ActivatedRoute,
    public corporationService: CorporationService,
    public userService: UserService,
    public location: Location
  ) { }
  ngOnInit(): void {
   
    this.isEdit()

    this.getLoggedInUser();
  }
  isEdit() {
    this.route.params.subscribe(
      (data) => {
        console.log(data['id']);
        let id = data['id'];
       if(id != 0){
          this.edit = true;
          console.log(this.edit);
          
          //this.getUser(data['id']);
       }else{
          this.edit = false;
          console.log(this.edit);
       }
      },
      (err) => {
        console.log(err);
      }
    )
  }
  getUser(id: number) {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.User = data.data;
        console.log(this.User);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getLoggedInUser() {
    this.loggedinUser = this.lo.getLoggedInUser();
    console.log(this.loggedinUser);
  }
  addUser() {
   // check if email is valid 
    if (!this.validateEmail(this.User.email)) {
      alert('Please enter valid email');
      return;
    }
    this.User.CorporationId = this.loggedinUser.CorporationId;
    this.User.roleId = Roles.corporateUser;
    console.log(this.User);
    if (this.edit) {
     console.log(this.User);
    }
    else {
      this.userService.addUser(this.User).subscribe(
        (data) => {
          console.log(data);
          alert('User Added Successfully');
          this.location.back();
        },
        (err) => {
          console.log(err);
          console.log(err.error.message);
          alert(err.error.message); 
        }
      )
    }
  }
  cancel() { 
    this.location.back();

  }
  validateEmail(email: string) {
    console.log(email);
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

}
