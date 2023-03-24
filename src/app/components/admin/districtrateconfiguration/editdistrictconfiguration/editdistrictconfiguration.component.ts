import { Component, OnInit } from '@angular/core';
import { Apiresponse, District } from 'src/app/ratelist-models';
import { DistrictsService } from 'src/app/ratelist-services';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StatesService } from 'src/app/services/states/states.service';
import { State } from 'src/app/ratelist-models';
import { ToastrService } from 'ngx-toastr';
import { DistrictRateConfiguration } from 'src/app/models/districtrateconfiguration';
import { DistrictrateconfigService } from 'src/app/services/districtrateconfig/districtrateconfig.service';
import { Location } from '@angular/common';
import { Commodity } from 'src/app/ratelist-models';
import { CommoditiesService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-editdistrictconfiguration',
  templateUrl: './editdistrictconfiguration.component.html',
  styleUrls: ['./editdistrictconfiguration.component.scss']
})
export class EditdistrictconfigurationComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  states: State[] = [];
  state: State = new State();
  faEdit = faEdit;
  faTrash = faTrash;
  loading = false;
  error = '';
  errorStatus = false;
  faPenToSquare = faPenToSquare;
  districts: District[] = [];
  districtRateConfigurationId: number = 0;
  districtRateConfiguration: DistrictRateConfiguration = new DistrictRateConfiguration();
  edit: boolean = false;
  commodities: Commodity[] = [];
  constructor(
    private DistrictsService: DistrictsService,
    private router: Router,
    private statesService: StatesService,
    private toastr: ToastrService,
    private districtrateconfigService: DistrictrateconfigService,
    private route: ActivatedRoute,
    private location: Location,
    private commodityService: CommoditiesService
  ) {
    this.districtRateConfigurationId = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.isEdit();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllStates();
    this.getAllCommodities();
  }
  getAllCommodities() {
    this.commodityService.getAllCommodities().subscribe(
      (data: Apiresponse) => {
        this.commodities = data.data;
      },
      (error) => {
        this.error = error;
        this.errorStatus = true;
      }
    );
  }

  isEdit() {
    this.edit = this.districtRateConfigurationId > 0 ? true : false;
    if (this.districtRateConfigurationId > 0) {
      this.districtrateconfigService.getDistrictconfigById(this.districtRateConfigurationId).subscribe(
        (data: Apiresponse) => {
          this.districtRateConfiguration = data.data;
        },
        (error) => {
          this.error = error;
          this.errorStatus = true;
        }
      );
    }else{
      this.districtRateConfiguration = new DistrictRateConfiguration();
    }
  }
  getAllStates() {
    this.statesService.admingetStates().subscribe(
      (data: Apiresponse) => {
        this.states = data.data;
      },
      (error) => {
        this.error = error;
        this.errorStatus = true;
      }
    );
  }
  back(){
    this.location.back();
  }
  saveDistrictconfig() {
    if(this.edit){
      this.updateDistrictconfig();
    }else{
      this.createDistrictconfig();
    }
  }
  createDistrictconfig() {
    console.log(this.districtRateConfiguration,"create");
    if(this.districtRateConfiguration.commodityId == 0){
      this.toastr.error('Please select commodity', 'Error');
      return;
    }
    
    if(this.districtRateConfiguration.districtId == 0){
      this.toastr.error('Please select district', 'Error');
      return;
    }
    if(this.districtRateConfiguration.retailPriceFactor == 0){
      this.toastr.error('Please enter rate', 'Error');
      return;
    }
    //addDistrictconfig
    this.districtrateconfigService.addDistrictconfig(this.districtRateConfiguration).subscribe(
      (data: Apiresponse) => {
        this.toastr.success('District Rate Configuration created successfully', 'Success');
        this.router.navigate(['/admin/districtrateconfiguration']);
      }
    );
  }
  updateDistrictconfig() {
    this.districtrateconfigService.updateDistrictconfig
    (this.districtRateConfiguration).subscribe(
      (data: Apiresponse) => {
        this.toastr.success('District Rate Configuration updated successfully', 'Success');
        this.router.navigate(['/admin/districtrateconfiguration']);
      }
    );
  }
  onStateChange(event: any) {
    let stateId = event.target.value;

    this.statesService.getDistrictsofstate(stateId).subscribe(
      (data: Apiresponse) => {
        this.districts = data.data;
      },
      (error) => {
        this.error = error;
        this.errorStatus = true;
      }
    );
  }


}
