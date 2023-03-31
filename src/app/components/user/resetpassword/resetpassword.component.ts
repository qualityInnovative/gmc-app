import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Apiresponse } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'ratelist-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  hasError: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  seePassword: boolean = false;
  userId: number = 0;
  busy: boolean = false;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private location: Location


  ) {
    let user = localStorage.getItem('user') || '{}'
    this.userId = JSON.parse(user).id
   }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.newPassword != this.confirmPassword) {
      this.toastr.error("New password and confirm password do not match")
      return;
    }
    console.log(this.oldPassword, this.newPassword, this.confirmPassword)
    this.busy = true;
    this.userService.changePassword(this.oldPassword, this.newPassword,this.userId).subscribe(
      (res:Apiresponse) => {
        this.busy = false;
        if (res.success == true) {
          this.toastr.success("Password changed successfully")
          this.location.back()
        }
        else {
          this.toastr.error(res.message)
        }
      },(err) => {
        this.busy = false;
        this.toastr.error("Error changing password")
      }
    )
  }





  seeconfirmpassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
    let doc=document.getElementById("confirmPassword") as HTMLInputElement;
    if (doc?.type === "password") {
      doc.type = "text";
    }
    else {
      doc.type = "password";
    }

  }
  seenewpassword() {
    this.showNewPassword = !this.showNewPassword;
    let doc=document.getElementById("newPassword") as HTMLInputElement;
    if (doc?.type === "password") {
      doc.type = "text";
    }
    else {
      doc.type = "password";
    }

  }
  seepassword() {
    this.showPassword = !this.showPassword;
    let doc=document.getElementById("oldPassword") as HTMLInputElement;
    if (doc?.type === "password") {
      doc.type = "text";
    }
    else {
      doc.type = "password";
    }

  }

}
