import { Component, OnInit } from '@angular/core';
import { District,Tehsil ,State} from 'src/app/ratelist-models';
import { DistrictsService,TehsilService,StatesService } from 'src/app/ratelist-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
@Component({
  selector: 'ratelist-editdistrict',
  templateUrl: './editdistrict.component.html',
  styleUrls: ['./editdistrict.component.scss']
})
export class EditdistrictComponent implements OnInit {
  edit: boolean = false;
  district: District = new District();
  districtId: number = 0;
  tehsils: Tehsil[] = [];
  states: State[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private DistrictsService: DistrictsService,
    private TehsilService: TehsilService,
    private StatesService: StatesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.districtId = this.route.snapshot.params['districtId'];
  }
  ngOnInit(): void {
    this.isEdit();
    this.getStates();
  }
  getStates() {
    this.StatesService.admingetStates()
      .subscribe(
        data => {
          this.states = data.data;
          console.log(this.states);
        },
        error => {
          console.log(error);
        }
      )
  }
  isEdit() {
    if (this.districtId > 0) {
      this.edit = true;
      this.getDistrict();

      
    } else {
      this.edit = false;
      this.district.id = 0;
      this.district.stateId = this.route.snapshot.params['stateId'];
    }
  }
  addTehsil() {
    this.router.navigate(['/admin/tehsils/edittehsil', this.district.id, 0]);
  }
  getDistrict(): void {
    this.DistrictsService.admingetDistrictById(this.districtId)
      .subscribe(
        data => {
          this.district = data.data;
          console.log(this.district);
          this.getTehsilsForDistrict();
        },
        error => {
          console.log(error);
        }
      )
  }
  back() {
    this.location.back();
  }
  saveDistrict() {
    if (this.edit) {
      this.updateDistrict();
    } else {
      this.addDistrict();
    }
   }
  updateDistrict() {
    this.DistrictsService.adminupdateDistrict(this.district)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/admin/districts']);
        },
        error => {
          console.log(error);
        }
      )
  }
  addDistrict() { 
    this.DistrictsService.adminaddDistrict(this.district)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/admin/districts']);
        },
        error => {
          console.log(error);
        }
      )
  }
  getTehsilsForDistrict() {
    this.TehsilService.admingettehsilsfordistrict(this.district.id)
      .subscribe(
        data => {
          this.tehsils = data.data;
          console.log(this.tehsils);
         
        },
        error => {
          console.log(error);
        }
      )
  }
  editTehsil(tehsilId: number) {
    this.router.navigate(['/admin/tehsils/edittehsil', this.district.id, tehsilId]);
  }
  deleteTehsil(tehsilId: number) {
    this.TehsilService.admindeletetehsil(tehsilId)
      .subscribe(
        data => {
          console.log(data);
          this.getTehsilsForDistrict();
        },
        error => {
          console.log(error);
        }
      )
  }
}
