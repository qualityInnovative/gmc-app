import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Apiresponse, Mandi } from 'src/app/ratelist-models';
import { MandiService } from 'src/app/services/mandi/mandi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StatesService } from 'src/app/ratelist-services';
import { State } from 'src/app/ratelist-models';
import { District } from 'src/app/ratelist-models';
import { DistrictsService } from 'src/app/ratelist-services';

@Component({
  selector: 'ratelist-editmandi',
  templateUrl: './editmandi.component.html',
  styleUrls: ['./editmandi.component.scss']
})
export class EditmandiComponent implements OnInit {
  edit: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  mandis: Mandi[] = [];
  mandi: Mandi = new Mandi();
  mandiId: number = 0;
  states: State[] = [];
  districts: District[] = [];
  faEdit = faEdit;
  faTrash = faTrash;
  loading = false;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private mandiService: MandiService,
    private location: Location,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private route: ActivatedRoute,
  ) {
    this.mandiId = this.route.snapshot.params['mandiId'];
  }
  ngOnInit(): void {
    this.isEdit();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllStates();
  }
  isEdit() {
    if (this.mandiId > 0) {
      this.edit = true;
      this.getMandi();

    } else {
      this.edit = false;
    }
  }
  getMandi() {
    this.mandiService.adminGetMandiById(this.mandiId).subscribe((res: Apiresponse) => {
      if (res.success) {
        this.mandi = res.data;
        console.log(this.mandi);
        this.getDistrictsByStateId(this.mandi.stateId);
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  back() {
    this.location.back();
  }
  saveMandi() {
    if (this.edit) {
      this.updateMandi();
    } else {
      this.addMadni();
    }
  }
  updateMandi() {
    this.loading = true;
    if (this.mandi.name == null || this.mandi.name == '') {
      this.toastr.error('Please enter mandi name');
      this.loading = false;
      return;
    }
    if (this.mandi.stateId == null || this.mandi.stateId == 0) {
      this.toastr.error('Please select state');
      this.loading = false;
      return;
    }
    if (this.mandi.districtId == null || this.mandi.districtId == 0) {
      this.toastr.error('Please select district');
      this.loading = false;
      return;
    }
    this.mandiService.adminUpdateMandi(this.mandi).subscribe((res: Apiresponse) => {
      this.loading = false;
      if (res.success) {
        this.toastr.success(res.message);
        this.back();
      } else {
        this.toastr.error(res.message);
      }
    });
  }
  addMadni() {
    this.loading = true;
    if (this.mandi.name == null || this.mandi.name == '') {
      this.toastr.error('Please enter mandi name');
      this.loading = false;
      return;
    }
    if (this.mandi.stateId == null || this.mandi.stateId == 0) {
      this.toastr.error('Please select state');
      this.loading = false;
      return;
    }
    if (this.mandi.districtId == null || this.mandi.districtId == 0) {
      this.toastr.error('Please select district');
      this.loading = false;
      return;
    }
    this.mandiService.adminAddMandi(this.mandi).subscribe((res: Apiresponse) => {
      this.loading = false;
      if (res.success) {
        this.toastr.success(res.message);
        this.back();

      } else {
        this.toastr.error(res.message);
      }
    });
  }
  getAllStates() {
    this.statesService.admingetStates().subscribe((res: Apiresponse) => {
      this.states = res.data;
      console.log(this.states);
    });
  }
  getDistrictsByStateId(event: any) {
    let stateId: number = 0;
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
      stateId = event.target.value;
    } else {
      stateId = event
    }
    console.log(stateId)
    this.statesService.getDistrictsofstate(stateId).subscribe((res: Apiresponse) => {
      this.districts = res.data;
      console.log(this.districts);
    });
  }
}
