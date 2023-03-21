import { Component, OnInit } from '@angular/core';
import { Tehsil, District, Apiresponse,State } from 'src/app/ratelist-models';
import { Router, ActivatedRoute } from '@angular/router';
import { TehsilService ,DistrictsService,StatesService} from 'src/app/ratelist-services';
import { Location } from '@angular/common';
@Component({
  selector: 'ratelist-edittehsil',
  templateUrl: './edittehsil.component.html',
  styleUrls: ['./edittehsil.component.scss']
})
export class EdittehsilComponent implements OnInit {
  loading = false;
  tehsil: Tehsil = new Tehsil();
  district: District = new District();
  districts: District[] = [];
  states: State[] = [];
  stateId: number = 0;
  districtId: number = 0;
  tehsilId: number = 0;
  edit: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tehsilService: TehsilService,
    private location: Location,
    private districtService: DistrictsService,
    private stateService: StatesService
  ) {
    this.route.params.subscribe(params => {
      this.districtId = params['districtId'];
      this.tehsilId = params['tehsilId'];
    });
  }
  ngOnInit(): void {
    this.loading = true;
    this.getStates();
    if (this.isEdit()) {
      this.getTehsil();
      this.getDistrict();
    } else {
      this.loading = false;
    }
  }
  getDistrictsofstate(
    event: any
  ): void {
    console.log(event)
    let stateId = event;
    this.stateService.getDistrictsofstate(stateId).subscribe((data: any) => {
      this.districts = data.data;
    });
  }
  getDistrict(): void {
    this.districtService.admingetDistrictById(this.districtId).subscribe((data: any) => {
      this.district = data.data;
      console.log(this.district);
      this.stateId = this.district.stateId;
      this.getDistrictsofstate(this.stateId);
    });
  }
  getStates(): void {
    this.stateService.admingetStates().subscribe((data: any) => {
      this.states = data.data;
    });
  }
  isEdit(): boolean {
    if (this.tehsilId > 0) {
      
      this.edit = true;
    }
    return this.edit;
  }
  getTehsil(): void {
    this.tehsilService.admingettehsil(this.tehsilId).subscribe((data: any) => {
      this.tehsil = data.data;
      console.log(this.tehsil);
      this.loading = false;
    });
  }
  saveTehsil(): void {
    if(this.tehsil.name == null || this.tehsil.name == ""){
      alert("Please Enter Tehsil Name");
      return;
    }
    if(this.tehsil.districtId == null || this.tehsil.districtId == 0){
      alert("Please Select District");
      return;
    }
    if (this.edit) {
      this.tehsilService.adminupdatetehsil(this.tehsil).subscribe((data: Apiresponse) => {
        if (data.success == true) {
          console.log(data);
          alert("Tehsil Updated Successfully");
        }
      },
        error => {
          console.log(error);

        });
    } else {
      this.tehsilService.admincreatetehsil(this.tehsil).subscribe((data: Apiresponse) => {
        if (data.success == true) {
          console.log(data);
          alert("Tehsil Created Successfully");
        } else {
          alert("Tehsil Already Exists");
        }
      }, (err) => {
        console.log(err);
      });
  }

  }
  back(): void {
    this.location.back();
  }
}
