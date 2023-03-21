import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/services/units/units.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ratelist-editunits',
  templateUrl: './editunits.component.html',
  styleUrls: ['./editunits.component.scss']
})
export class EditunitsComponent implements OnInit {
  loading: boolean = true;
  error = '';
  errorStatus = 0;
  unit: Unit = new Unit();
  unitId: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unitsService: UnitsService,
    private location: Location
  ) { }


  ngOnInit(): void { 
    this.isEdit();
  }
  isEdit(): boolean {
    this.route.params.subscribe(params => {
      this.unitId = params['unitId'];
      console.log(this.unitId)
    });
    if (this.unitId > 0) {
      this.unitsService.getUnitById(this.unitId).subscribe(
        (data) => {
          this.unit = data.data;
          console.log(this.unit)
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.errorStatus = error.status;
          this.loading = false;
        }
      )
    } else {
      this.loading = false;
    }
    return this.unitId > 0;
  }
  back() {
    this.location.back();
  }
  saveUnit() {
    if (this.isEdit()) {
      this.unitsService.updateUnit(this.unit).subscribe(
        (data) => {
          this.back();
        },
        (error) => {
          this.error = error;
        }
      )
    } else {
      this.unitsService.addUnit(this.unit).subscribe(
        (data) => {
          this.back();
        },
        (error) => {
          this.error = error;
        }
      )
    }
  }



}
