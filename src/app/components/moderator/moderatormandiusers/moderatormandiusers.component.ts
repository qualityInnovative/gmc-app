import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/ratelist-models';
import { MandiusersService } from 'src/app/services/mandiusers/mandiusers.service';
import { UserService } from 'src/app/services/user/user.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'ratelist-moderatormandiusers',
  templateUrl: './moderatormandiusers.component.html',
  styleUrls: ['./moderatormandiusers.component.scss']
})
export class ModeratormandiusersComponent implements OnInit {
  users: UserProfile[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private mandiusersService: MandiusersService,
    private userService: UserService,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getUserProfile();
  }
  getUserProfile(){
    this.userService.getUserProfile().subscribe(
      (data:Apiresponse) => {
        console.log(data.data.Profile.mandiId);
        this.getUsersProfileforMandi(data.data.Profile.mandiId);
      },
      (error) => {
        console.log(error);
      })
  }
  getUsersProfileforMandi(mandiId:number){
    this.mandiusersService.getUsersProfileforMandi(mandiId).subscribe(
      (data:any) => {
        this.users = data.data;
        this.dtTrigger.next(data.data);
      },
      (error) => {
        console.log(error);
      })
  }
  createMandiUser(){
    this.router.navigate(['/moderator/mandiusers/editmandiuser',0]);
  }
}
