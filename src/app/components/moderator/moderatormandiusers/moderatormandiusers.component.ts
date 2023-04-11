import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/ratelist-models';
import { MandiusersService } from 'src/app/services/mandiusers/mandiusers.service';
import { UserService } from 'src/app/services/user/user.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Mandi } from 'src/app/ratelist-models';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Role } from 'src/app/ratelist-models';
@Component({
  selector: 'ratelist-moderatormandiusers',
  templateUrl: './moderatormandiusers.component.html',
  styleUrls: ['./moderatormandiusers.component.scss']
})
export class ModeratormandiusersComponent implements OnInit {
  users: UserProfile[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  mandis: Mandi[] = [];
  roles: Role[] = [];
  constructor(
    private mandiusersService: MandiusersService,
    private userService: UserService,
    private router: Router,
    private mandiService: MandiService
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getUserProfile();
    this.getMandis();
    this.getAllRoles();

  }
  getAllRoles() {
    this.userService.getUserRoles().subscribe(
      (data: Apiresponse) => {
        this.roles = data.data;
      },
      (error) => {
        console.log(error);
      })
  }
  getMandis() {
    this.mandiService.
      getallMandis()
      .subscribe(
        (data: Apiresponse) => {
          this.mandis = data.data;
        },
        (error) => {
          console.log(error);
        })
  }
  getUserRoleName(roleId: number) {
    let role = this.roles.find(r => r.id == roleId);
    return role!.name;
  }

  getmandinamebyid(mandiId: number) {
    let mandi = this.mandis.find(m => m.id == mandiId);
    return mandi!.name;
  }

  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: Apiresponse) => {
        console.log(data.data.Profile.mandiId);
        this.getUsersProfileforMandi(data.data.Profile.mandiId);
      },
      (error) => {
        console.log(error);
      })
  }
  getUsersProfileforMandi(mandiId: number) {
    this.mandiusersService.getUsersProfileforMandi(mandiId).subscribe(
      (data: any) => {
        this.users = data.data;
        this.dtTrigger.next(data.data);
      },
      (error) => {
        console.log(error);
      })
  }
  createMandiUser() {
    this.router.navigate(['/moderator/mandiusers/editmandiuser', 0]);
  }
}
