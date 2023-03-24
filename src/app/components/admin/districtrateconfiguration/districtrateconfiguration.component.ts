import { Component, OnInit } from '@angular/core';
import { Apiresponse, District } from 'src/app/ratelist-models';
import { DistrictsService } from 'src/app/ratelist-services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StatesService } from 'src/app/services/states/states.service';
import { State } from 'src/app/ratelist-models';
import { ToastrService } from 'ngx-toastr';
import { DistrictRateConfiguration } from 'src/app/models/districtrateconfiguration';
import { DistrictrateconfigService } from 'src/app/services/districtrateconfig/districtrateconfig.service';
import { Commodity } from 'src/app/ratelist-models';
import { CommoditiesService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-districtrateconfiguration',
  templateUrl: './districtrateconfiguration.component.html',
  styleUrls: ['./districtrateconfiguration.component.scss']
})
export class DistrictrateconfigurationComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  states: State[] = [];
  faEdit = faEdit;
  faTrash = faTrash;
  loading = false;
  error = '';
  errorStatus = false;
  faPenToSquare = faPenToSquare;
  districtRateConfigurations: DistrictRateConfiguration[] = [];
  districts: District[] = [];
  commodities: Commodity[] = [];
  constructor(
    private DistrictsService: DistrictsService,
    private router: Router,
    private statesService: StatesService,
    private toastr: ToastrService,
    private districtrateconfigService: DistrictrateconfigService,
    private commodityService: CommoditiesService
  ) { }
  ngOnInit(): void {
    this.getAllcommodities();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllDistricts();
    this.getAllDistrictconfig();
  }
  getAllDistricts() {
    this.DistrictsService.getAllDistricts()
      .subscribe(
        (data: Apiresponse) => {
          this.districts = data.data;
        },
        (error) => {
          this.error = error;
          this.errorStatus = true;
        }
      );
  }
  getDistrictName(id: number) {
    let district = this.districts.find(d => d.id === id);
    if (district) {
      return district.name;
    }
    return '';
  }
  getAllcommodities() {
    this.commodityService.getAllCommodities()
      .subscribe(
        (data: Apiresponse) => {
          this.commodities = data.data;
        },
        (error) => {
          this.error = error;
          this.errorStatus = true;
        }
      );
  }
  getCmmodityName(id: number) {
    let commodity = this.commodities.find(c => c.id === id);
    if (commodity) {
      return commodity.name;
    }
    return '';
  }

  getAllDistrictconfig() {
    this.districtrateconfigService.getallDistrictconfig().subscribe(
      (data: Apiresponse) => {
        console.log(data);
        this.districtRateConfigurations = data.data;
        this.dtTrigger.next(this.districtRateConfigurations);
      },
      (error) => {
        this.error = error;
        this.errorStatus = true;
      }
    );
  };
  editDistrictconfig(districtrateconfig: DistrictRateConfiguration) {
    this.router.navigate(['/admin/districtrateconfiguration/editdistrictconfiguration', districtrateconfig.id]);

  }
  deleteDistrictconfig(districtrateconfig: DistrictRateConfiguration) {
    if (confirm("Are you sure to delete " + districtrateconfig.id)) {
      this.districtrateconfigService.deleteDistrictconfig(districtrateconfig.id).subscribe(
        (data: Apiresponse) => {
          this.toastr.success('District Rate Configuration Deleted Successfully');
          this.getAllDistrictconfig();
        },
        (error) => {
          this.error = error;
          this.errorStatus = true;
        }
      );
    }
  }
  addDistrictconfig() {
    this.router.navigate(['/admin/districtrateconfiguration/editdistrictconfiguration', 0]);
  }

}
