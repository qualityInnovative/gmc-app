import { Component, OnInit } from '@angular/core';
import { Apiresponse, District,Mandi } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StatesService } from 'src/app/services/states/states.service';
import { State } from 'src/app/ratelist-models';
import { ToastrService } from 'ngx-toastr';
import { Mandicommoditypricing } from 'src/app/models/mandicommoditypricing';
import { MandicommoditypricingService } from 'src/app/services/mandicommoditypricing/mandicommoditypricing.service';
import { CommoditiesService } from 'src/app/ratelist-services';
import { Commodity } from 'src/app/models/commodity';
import { MandiService } from 'src/app/services/mandi/mandi.service';
@Component({
  selector: 'ratelist-mandicommoditypricing',
  templateUrl: './mandicommoditypricing.component.html',
  styleUrls: ['./mandicommoditypricing.component.scss']
})
export class MandicommoditypricingComponent implements OnInit {
  loading = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  districts: District[] = [];
  states: State[] = [];
  mandicommoditypricing: Mandicommoditypricing[] = [];
  commmodities: Commodity[] = [];
  mandis: Mandi[] = [];
  errorStatus = false;
  error = '';
  constructor(
    private router: Router,
    private statesService: StatesService,
    private toastr: ToastrService,
    private mandicommoditypricingService: MandicommoditypricingService,
    private commoditiesService: CommoditiesService,
    private mandiService: MandiService
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllMandiCommodityPricing();
    this.getAllCommodities();
    this.getAllMandis();
  }
  getAllMandis() {
    this.mandiService
      .getallMandis()
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.mandis = data.data;
          console.log(this.districts);
        }
      });
  }

  getAllCommodities() {
    this.commoditiesService
      .getAllCommodities()
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.commmodities = data.data;
          console.log(this.commmodities);
        }
      });
  }
  getAllMandiCommodityPricing() {
    this.mandicommoditypricingService
      .getallMandicommoditypricing()
      .subscribe((data: Apiresponse) => {
        if (data.success) {
          this.mandicommoditypricing = data.data;
          console.log('mandi commodity pricing ', this.mandicommoditypricing);
          this.dtTrigger.next(
            this.mandicommoditypricing
          );
        }
      });
  }
  getCommodityName(id: number) {
    const commodity = this.commmodities.find(x => x.id === id);
    if (commodity) {
      return commodity.name;
    }
    return '';
  }
  getMandiName(id: number) {
    const mandi = this.mandis.find(x => x.id === id);
    if (mandi) {
      return mandi.name;
    }
    return '';
  }
  addMandiCommoditypricing() {
    this.router.navigate(['/admin/mandicommoditypricing/editmandicommoditypricing', 0]);
  }
  editmandicommoditypricing(mandipricing: Mandicommoditypricing) {
    this.router.navigate(['/admin/mandicommoditypricing/editmandicommoditypricing', mandipricing.id]);
  }
  deletemandicommoditypricing(id: number) {
    if (confirm('Are you sure you want to delete this record?')) {
      this.mandicommoditypricingService
        .deleteMandiCommodityPricing(id)
        .subscribe((data: Apiresponse) => {
          if (data.success) {
            this.toastr.success('Mandi Commodity Pricing deleted successfully');
            this.getAllMandiCommodityPricing();
          } else {
            this.toastr.error('Mandi Commodity Pricing not deleted');
          }

        });
    }
  }
}
