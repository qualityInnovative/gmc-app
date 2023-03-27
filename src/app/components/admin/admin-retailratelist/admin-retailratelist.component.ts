import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ratelist-admin-retailratelist',
  templateUrl: './admin-retailratelist.component.html',
  styleUrls: ['./admin-retailratelist.component.scss']
})
export class AdminRetailratelistComponent implements OnInit {
  retailratelist: RetailRateList[] = [];
  loading = false;
  errorStatus = false;
  error = '';
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private retailratelistService: RetailratelistService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getRetailRateList();
  }
  getRetailRateList() {
    this.retailratelistService
    .getRetailRateList()
    .subscribe((res: Apiresponse) => {
      this.retailratelist = res.data;
    });
  }
  addratelist() {
    this.router.navigate(['admin/adminretailratelist/editadminretaillist',0]);
  }
  editratelist(id: number) {
    this.router.navigate(['admin/adminretailratelist/editadminretaillist', id]);
  }
  deleteratelist(id: number) {
    console.log(id);
  }


}
