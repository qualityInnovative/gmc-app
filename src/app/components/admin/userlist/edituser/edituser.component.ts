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
import { AssignedDistrict } from 'src/app/models/assignedDistrict';
@Component({
  selector: 'ratelist-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
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
  assignDistrict: AssignedDistrict = new AssignedDistrict();
  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
    private statesService: StatesService,
    private districtsService: DistrictsService
  ) { }
  ngOnInit(): void {
    this.getUserRoles();
    this.getAllStates();
    this.isEdit();
    this.loading = true;
  }
  isEdit() {
    this.route.params.subscribe(params => {
      if (params['userId'] > 0) {
        this.userId = params['userId'];
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
    this.assignDistrict.stateId = stateId;
    this.assignDistrict.userId = this.userId;
    this.districtsService.admingetDistrictsByStateId(stateId).subscribe(
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
        this.stateId = this.userProfile.AssignedDistrict.stateId;
        this.districtId = this.userProfile.AssignedDistrict.districtId;
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
        console.log(this.roles);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    )
  }
  selectedDistrits(districtId: number) {
    this.assignDistrict.districtId = districtId;
  }

  back() {
    this.location.back();
  }
  saveUser() {
    // only one district is assigned to user
   
    this.assignDistrict.userId = this.userId;
    this.assignDistrict.districtId = this.districtId;
    this.assignDistrict.stateId = this.stateId;
    console.log(this.assignDistrict);
    if(this.assignDistrict.districtId==0){
      alert("Please select district");
      return;
    }
    if(this.assignDistrict.stateId==0){
      alert("Please select state");
      return;
    }
    this.userProfile.AssignedDistrict = this.assignDistrict;
    console.log(this.userProfile);
    this.userService.updateUser(this.userProfile).subscribe(
      (data) => {
       console.log(data);
       alert(data.message);
      })

    
  }

}
