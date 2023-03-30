import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Apiresponse, District, UserProfile } from 'src/app/ratelist-models';
import { User } from 'src/app/ratelist-models';
import { LoginService } from 'src/app/ratelist-services';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import { Designation } from 'src/app/models/designation';
import { Department } from 'src/app/models/department';

import { DesignationService } from 'src/app/services/designation/designation.service';
import { DeparmentService } from 'src/app/services/departmant/deparment.service';

import { State } from 'src/app/ratelist-models';
import { StatesService } from 'src/app/ratelist-services';

import { DistrictsService } from 'src/app/ratelist-services';

import { FileuploadService } from 'src/app/services/fileupload/fileupload.service';





@Component({
  selector: 'ratelist-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  loggedInUser: User = new User();
  userprofile: UserProfile = new UserProfile();
  faEdit = faEdit;
  
  designationList: Designation[] = [];
  departmentList: Department[] = [];
  stateList: State[] = [];
  districtList: District[] = [];
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private designationService: DesignationService,
    private departmentService: DeparmentService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private fileuploadService: FileuploadService


  ) {
    this.loggedInUser = this.loginService.getLoggedInUser();
  }
  ngOnInit(): void {
    console.log('loggedin', this.loggedInUser);
    this.getLoggedInUserProfile(this.loggedInUser.id);
    this.getAllStates();
    this.getAllDistricts();
  }
  getAllStates() {
    this.statesService
      .admingetStates().subscribe(
        (data: Apiresponse) => {
          console.log('states', data.data);
          this.stateList = data.data;
        }
      );
  }
  getAllDistricts() {
    this.districtsService
      .admingetDistricts().subscribe(
        (data: Apiresponse) => {
          console.log('districts', data.data);
          this.districtList = data.data;
        }
      );
  }

  getLoggedInUserProfile(id: number) {
    this.loginService.getUserProfile(id).subscribe(
      (data: Apiresponse) => {
        console.log('user profile', data.data);
        this.userprofile = data.data;
      }, (error) => {
        console.log('error', error);
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
  onSubmit() {
    this.loginService.updateUserProfile(this.userprofile).subscribe(
      (data: Apiresponse) => {
        console.log('user profile', data.data);
        //reload header component
        this.loginService.reloadHeaderComponent();
        this.toastr.success('Profile Updated Successfully', 'Success');
      }
    );
  }
  getDistricts(stateId: number) {
    this.statesService.getDistrictsofstate(stateId).subscribe(
      (data: Apiresponse) => {
        console.log('districts', data.data);
        this.districtList = data.data;
      }
    );
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData.has('file'));
    this.fileuploadService.uploadProfileImage(formData).subscribe(
      (data: Apiresponse) => {
        console.log('file upload', data.data);
        this.userprofile.Profile.image = data.data.path
      }, (error) => {
        console.log('error', error);
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
}
