import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Router } from '@angular/router';
import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/services/units/units.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'ratelist-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  loading: boolean = true;
  error = '';
  errorStatus = 0;
  units: Unit[] = [];
  faEdit = faEdit;
  faTrash = faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private router: Router,
    private unitsService: UnitsService
  ) { }
  ngOnInit(): void {
    this.getUnits();
  }
  getUnits() {
    this.unitsService.getUnits().subscribe(
      (data) => {
        this.units = data.data;
        this.dtTrigger.next(this.units);
        this.loading = false;
      },
      (error) => {
        this.error = error;
        this.loading = false;
      }
    )
  }
  editUnit(id: number) {
    this.router.navigate(['/admin/units/editunit/' + id]);
  }
  deleteUnit(id: number) {
    if (confirm('Are you sure you want to delete this unit?')) {
      this.unitsService.deleteUnit(id).subscribe(
        (data) => {
          this.getUnits();
          this.dtTrigger.next(this.units);
        },
        (error) => {
          this.error = error;
        }
      )
    }
  }
  addUnit() {
    this.router.navigate(['/admin/units/editunit/0']);
  }
}
