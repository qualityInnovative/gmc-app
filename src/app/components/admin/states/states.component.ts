import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { State } from 'src/app/ratelist-models';
import { StatesService } from 'src/app/services/states/states.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'ratelist-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit, OnDestroy {
  loading = true;
  errorStatus = false;
  error = '';
  faPlus = faPlus;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  states: State[] = [];
  constructor(
    private statesService: StatesService,
    private router: Router
  ) { }
  getStates(): void {
    this.loading = true;
    this.statesService.admingetStates()
      .subscribe(
        data => {
          this.loading = false;
          this.states = data.data;
          this.dtTrigger.next(data.data);
        },
        error => {
          this.loading = false;
          this.errorStatus = true;
          this.error = error.message;
        }
      )
  }
  ngOnInit(): void {
    this.getStates();
  }
  addState() {
    this.router.navigate(['/admin/states/editstates', 0]);
  }
  editState(state: State) {
    this.router.navigate(['/admin/states/editstates', state.id]);
  }
  ngOnDestroy(): void {
    this.states = [];
    this.dtTrigger.unsubscribe();
  }
  deleteState(state: State) {
    if (confirm("Are you sure to delete " + state.name)) {
      this.statesService.admindeleteState(state.id)
        .subscribe(
          data => {
            this.getStates();
          },
          error => {
            console.log(error);
          }
        )
    }
  }
  addDistrictToState(state: State) {
    this.router.navigate(['/admin/districts/editdistricts', state.id, 0]);
  }
}
