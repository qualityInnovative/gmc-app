import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import {Unit} from 'src/app/ratelist-models';
import {UnitsService} from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-addcommoditydiscount',
  templateUrl: './addcommoditydiscount.component.html',
  styleUrls: ['./addcommoditydiscount.component.scss']
})
export class AddcommoditydiscountComponent implements OnInit {
  loading: boolean = false;
  errorStatus: number = 0;
  error: string = "";
  faEye = faEye;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  units: Unit[] = [];
  corporationcommoditiesdiscounts: any[] = [];

  constructor(
    private router: Router,
    private unitsService: UnitsService
  ) { }

  ngOnInit(): void {
    this.getallunits();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }
  addcorporatecommoditydiscount() {
    this.router.navigate(['corporate/addcommoditydiscount/viewaddcommoditydiscount',0]);
  }
  viewcorporatecommoditydiscount(id: number) {
    this.router.navigate(['corporate/addcommoditydiscount/viewaddcommoditydiscount',id]);
  }
  getallunits() {
    this.unitsService.
      getUnits
      ().subscribe(
        (data) => {
          this.units = data.data;
          console.log(this.units);
        }
      )
  }
  getUnitsNameBYId(id: number) {
    let unit = this.units.find(x => x.id == id);
    return unit?.name;
  }
}
