import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { CommoditiesService } from 'src/app/ratelist-services';
import { Commodity } from 'src/app/ratelist-models';
@Component({
  selector: 'ratelist-editadmin-retailratelist',
  templateUrl: './editadmin-retailratelist.component.html',
  styleUrls: ['./editadmin-retailratelist.component.scss']
})
export class EditadminRetailratelistComponent implements OnInit {
  edit: boolean = false;
  commodities: Commodity[] = [];
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
    private location: Location,
    private commoditiesService: CommoditiesService
  ) {
    this.retailratelistId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.getAllCommodities();
    this.isEdit();
  }
  getAllCommodities() {
    this.commoditiesService.getAllCommodities()
      .subscribe((res: Apiresponse) => {
        this.commodities = res.data;
        console.log(this.commodities);
      });
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
        console.log(this.retailratelist);
      });
  }

  saveRateList() {
    if (this.edit) {
      console.log(this.retailratelist);
      // this.retailratelistService.
      //   updateRetailRateList(this.retailratelistId, this.retailratelist).
      //   subscribe((res: Apiresponse) => {
      //     this.router.navigate(['admin/adminretailratelist']);
      //   });
    } else {
      console.log(this.retailratelist);
      // this.retailratelistService.saveRetailRateList(this.retailratelist)
      //   .subscribe((res: Apiresponse) => {
      //     this.router.navigate(['admin/adminretailratelist']);
      //   });
    }
  }
  back() {
    this.location.back();
  }

}
