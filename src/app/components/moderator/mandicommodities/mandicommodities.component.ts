import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/ratelist-models';
import { MandicommoditiesService } from 'src/app/services/mandicommodities/mandicommodities.service';
import { UserService } from 'src/app/services/user/user.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ratelist-mandicommodities',
  templateUrl: './mandicommodities.component.html',
  styleUrls: ['./mandicommodities.component.scss']
})
export class MandicommoditiesComponent implements OnInit {
  user: UserProfile = new UserProfile();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  mandicommodities: any[] = [];
  mandiId: number = 0;
  faTrash = faTrash;
  constructor(
    private mandicommoditiesService: MandicommoditiesService,
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: Apiresponse) => {
        console.log(data.data.Profile.mandiId);
        this.mandiId = data.data.Profile.mandiId;
        this.getCommmoditiesForMandi(this.mandiId);
      },
      (error) => {
        console.log(error);
      })
  }

  getCommmoditiesForMandi(mandiId: number) {
    this.mandicommoditiesService.getCommmoditiesForMandi(mandiId).subscribe(
      (data: any) => {
        console.log(data)
        this.mandicommodities = data.data;
      },
      (error) => {
        console.log(error);
      }
    )

  }
  openAddMandiCommodity() {
    this.router.navigate(['/moderator/mandicommodities/editmandicommodity/0']);
  }
  deleteMandiCommodity(mandiCommodityId: number) {
    if (confirm("Are you sure to delete this commodity from mandi?")) {
      this.mandicommoditiesService.deleteCommodityFromMandi(mandiCommodityId).subscribe(
        (data: any) => {
          console.log(data)
          //this.getCommmoditiesForMandi(this.user.mandiId);
          this.getCommmoditiesForMandi(this.mandiId);
        },
        (error) => {
          console.log(error);
        })
    }
    else {
      return;
    }



  }

}
