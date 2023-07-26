import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import {RetailRate} from 'src/app/models/retailrate';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-corporateaddretailrate',
  templateUrl: './corporateaddretailrate.component.html',
  styleUrls: ['./corporateaddretailrate.component.scss']
})
export class CorporateaddretailrateComponent implements OnInit {
  retailratelist: RetailRate[] = [];
  loading = false;
  errorStatus = false;
  error = '';
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  user: UserProfile= new UserProfile();
  userMandiId: number = 0;
  corporateId: number = 0;
  constructor(
    private retailratelistService: RetailratelistService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
     order: [5, 'desc']
    };
    this.getUser();
  }
  getUser(): void {
    this.userService.getUserProfile().subscribe(
      (data:Apiresponse) => {
        this.user = data.data;
        this.userMandiId = this.user.Profile.mandiId;
        this.corporateId = this.user.CorporationId;
        this.getRetailRateListforcorporate(this.corporateId);
      },
      error => {
        this.error = error;
        this.errorStatus = true;
      });
  }
  getRetailRateListforcorporate(corporateId: number): void {
    this.loading = true;
    this.retailratelistService.getRetailRateListforcorporate(corporateId).subscribe(
      (data: Apiresponse) => {
        // sort by created date
        this.retailratelist = data.data;
        this.dtTrigger.next(this.retailratelist);
        this.loading = false;
        console.log(this.retailratelist);
      },
      error => {
        this.error = error;
        this.errorStatus = true;
        this.loading = false;
      }
    );
  }
  corporateaddretailrate(): void {
    // department/retailratelist/deparmentaddretailrate/:id
    this.router.navigate(['corporate/addcorporateuser/viewcorporateretailrate',0]);
  }
  editRetailRateList(retailRateListId: number): void {
    //corporate/viewcorporateretailrate/:id
    this.router.navigate(['corporate/addcorporateuser/viewcorporateretailrate',retailRateListId]);
  }
  deleteRetailRateList(retailRateListId: number): void {
    if(confirm("Are you sure to delete this record?")) {
    this.loading = true;
    this.retailratelistService
    .deleteRetailRateList(retailRateListId)
    .subscribe(
      (data: Apiresponse) => {
        this.loading = false;
        this.toastr.success('Retail Rate List Deleted Successfully');
        this.getRetailRateListforcorporate(this.userMandiId);
      },
      error => {
        this.error = error;
        this.errorStatus = true;
        this.loading = false;
      }
    );
    }else{
      return;
    }
  }
}


