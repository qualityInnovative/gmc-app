import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/ratelist-models';
import { DistrictsService } from 'src/app/ratelist-services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StatesService } from 'src/app/services/states/states.service';
import { State } from 'src/app/ratelist-models';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.scss']
})
export class DistrictsComponent implements OnInit {
  districts: District[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  states: State[] = [];
  faEdit = faEdit;
  faTrash = faTrash;
  loading = false;
  error = '';
  errorStatus = false;
  faPenToSquare = faPenToSquare;
  constructor(
    private DistrictsService: DistrictsService,
    private router: Router,
    private statesService: StatesService,
    private toastr: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      processing: true
    };
    this.getAllStates();
    this.getAllDistricts();
  }
  getAllStates() {
    this.statesService.admingetStates().subscribe((states) => {
      this.states = states.data;
    });
  }
  addDistrict() {
    this.router.navigate(['/admin/districts/editdistricts', 0, 0]);
  }
  editDistrict(district: District) {
    // stateId/districtId
    this.router.navigate([
      '/admin/districts/editdistricts',
      district.stateId,
      district.id
    ]);
  }
  getAllDistricts() {
    this.DistrictsService.admingetDistricts()
      .subscribe((districts) => {
        this.loading = false;
        this.districts = districts.data;
        this.dtTrigger.next(districts.data);
      }, (error) => {
        this.errorStatus = true;
        this.error = error.message;
        this.loading = false;
      });
  }
  deleteDistrict(district: District) {
    if (confirm("Are you sure to delete " + district.name)) {
      this.DistrictsService.adminDeleteDistrict(district.id)
        .subscribe(
          data => {
            if (data.success == true) {
              this.toastr.success(data.message);
            }
            this.getAllDistricts();

          },
          error => {
            this.errorStatus = true;
            this.error = error.message;
            this.loading = false;
          }
        )
    }
  }
  getStateName(id: number) {
    return this.states.find((state) => state.id === id)?.name;
  }

}
