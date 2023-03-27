import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
@Component({
  selector: 'ratelist-editadmin-retailratelist',
  templateUrl: './editadmin-retailratelist.component.html',
  styleUrls: ['./editadmin-retailratelist.component.scss']
})
export class EditadminRetailratelistComponent implements OnInit {
  edit: boolean = false;
  retailratelist: RetailRateList = new RetailRateList();
  retailratelistId: number = 0;
  loading = false;
  errorStatus = false;
  error = '';
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private retailratelistService: RetailratelistService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { 
    this.retailratelistId = this.route.snapshot.params['id'];
    
  }
  ngOnInit(): void {
    this.isEdit();
  }
  isEdit() {
    if (this.retailratelistId > 0) {
      this.edit = true;
      this.getRetailRateList();
    }
  }
  getRetailRateList() {
    this.retailratelistService.getRetailRateListById(this.retailratelistId)
    .subscribe((res: Apiresponse) => {
      this.retailratelist = res.data;
    });
  }

  saveRateList() {
  }
  back() {
    this.location.back();
  }

}
