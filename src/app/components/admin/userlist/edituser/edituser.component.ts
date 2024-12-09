import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/services/user/user.service';
import { Role } from 'src/app/ratelist-models';
import { State } from 'src/app/ratelist-models';
import { StatesService } from 'src/app/ratelist-services';
import { District } from 'src/app/ratelist-models';
import { DistrictsService } from 'src/app/ratelist-services';
import { Mandi } from 'src/app/ratelist-models';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Corporation } from 'src/app/models/corporation';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { Roles } from 'src/app/ratelist-models';
@Component({
  selector: 'ratelist-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  Roles = Roles;
  corporations: Corporation[] = [];
  loading = false;
  error = '';
  errorStatus = 0;
  roles: Role[] = [];
  userProfile: UserProfile = new UserProfile();
  userId: number = 0;
  states: State[] = [];
  stateId: number = 0;
  districts: District[] = [];
  districtId: number = 0;
  mandis: Mandi[] = [];
  mandi: Mandi = new Mandi();
  edit = false;
  departments:any[]=[];

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private mandiService: MandiService,
    private corporationService: CorporationService
  ) { }
  ngOnInit(): void {
    this.getUserRoles();
    this.getAllStates();
    this.isEdit();
    this.getalldepartments();
    this.loading = true;
  }
  getalldepartments() {
    this.mandiService.getAlldepartments()
      .subscribe((res) => {
        console.log(res.data)
        this.departments=res.data
      })
  }

  isEdit() {
    this.route.params.subscribe(params => {
      if (params['userId'] > 0) {
        this.userId = params['userId'];
        this.edit = true;
        this.getUserById(this.userId);
      }
    });
  }

  getAllStates() {
    this.statesService.admingetStates().subscribe(
      (data) => {
        this.states = data.data;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    )
  }
  getDistrictsofstate(stateId: number) {
    this.districtsService.admingetDistrictsByStateId(stateId)
      .subscribe(
        (data) => {
          this.districts = data.data;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      )
  }
  getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.userProfile = data.data
        console.log(this.userProfile)
        this.stateId = this.userProfile.Profile.stateId;
        this.districtId = this.userProfile.Profile.districtId;
        this.getDistrictsofstate(this.stateId);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    )
  }
  getUserRoles() {
    this.userService.getUserRoles().subscribe(
      (data) => {
        this.roles = data.data;
       
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    )
  }


  back() {
    this.location.back();
  }
  saveUser() {
    if (this.edit) {
      this.userService.adminUpdateUser(this.userProfile)
      .subscribe(
        (data) => {
          this.router.navigate(['/admin/userlist']);
          this.loading = false;
        }
        ,
        (error) => {
          this.loading = false;
        }
      )
    } else {
      this.userService.adminCreateUser(this.userProfile).subscribe(
        (data) => {
          this.router.navigate(['/admin/userlist']);
          this.loading = false;
        }
        ,
        (error) => {
          this.loading = false;
        }
      )
    }
  }

}
