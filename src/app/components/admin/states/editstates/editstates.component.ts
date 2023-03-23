import { Component, OnDestroy, OnInit } from '@angular/core';
import { State, District } from 'src/app/ratelist-models';
import { StatesService } from 'src/app/services/states/states.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictsService } from 'src/app/ratelist-services';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'ratelist-editstates',
  templateUrl: './editstates.component.html',
  styleUrls: ['./editstates.component.scss']
})
export class EditstatesComponent implements OnInit, OnDestroy {
  faSave = faSave;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  state: State = new State();
  stateId: number = 0;
  edit: boolean = false;
  districts: District[] = [];
  dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    processing: true,
    dom: 'Bfrtip',
    searching: true,
  };
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private statesService: StatesService,
    private route: ActivatedRoute,
    private router: Router,
    private districtsService: DistrictsService,
    private toastr: ToastrService,
    private location: Location
  ) { }
  ngOnInit(): void {
    this.stateId = this.route.snapshot.params['id'];
    if (this.stateId > 0) {
      this.edit = true;
      this.getState();
    } else {
      this.edit = false;
      this.state.id = 0;
    }
  }
  getState(): void {
    this.statesService.admingetStateById(this.stateId)
      .subscribe(
        data => {
          this.state = data.data;
          console.log(this.state);
          this.getDistrictsbystate(this.state.id);
        },
        error => {
          console.log(error);
        }
      )
  }
  back() {
    this.location.back();
  }
  saveState() {
    if (this.state.id > 0) {
      this.updateState();
    } else {
      this.addState();
    }
  };
  getDistrictsbystate(id: number) {
    this.districtsService.admingetDistrictsByStateId(id)
      .subscribe(
        data => {
          this.districts = data.data;
          this.dtTrigger.next(data.data);

        },
        error => {
          console.log(error);
        }
      )
  }
  editDistrict(district: District) {
    this.router.navigate(['/admin/districts/editdistricts', this.state.id, district.id]);

  };
  deleteDistrict(district: District) {
    this.districtsService.adminDeleteDistrict(district.id)
      .subscribe(
        data => {
          if (data.success == true) {
            this.toastr.success('District Deleted Successfully', 'Success');
            this.getDistrictsbystate(this.state.id);
          }
        },
        error => {
          console.log(error);
        }
      )
  };

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    console.log("ngOnDestroy dis calleds")
  }

  updateState() {
    console.log('update', this.state);
    this.statesService.adminUpdateState(this.state)
      .subscribe(
        data => {
          console.log(data);
          if (data.success == true) {
            this.toastr.success('State Updated Successfully', 'Success');
          }
        }
        ,(error) => {
          this.toastr.error('State Update Failed', error.error.message);
        }
      )

  }

  addState() {
    this.statesService.adminAddState(this.state)
      .subscribe(
        data => {
          console.log(data);
          if (data.success == true) {
            this.toastr.success('State Added Successfully', 'Success');
            this.location.back();
            
          }
        },(error) => {
          this.toastr.error('State Add Failed', error.error.message);
        }
      )

  }
  addDistrictToState() {
    this.router.navigate(['/admin/districts/editdistricts', this.state.id, 0]);
  }
}
