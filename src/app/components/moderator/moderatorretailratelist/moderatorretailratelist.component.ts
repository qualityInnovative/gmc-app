import { Component, OnInit } from '@angular/core';
import { RetailratelistService } from 'src/app/services/retailratelist/retailratelist.service';
import { RetailRateList } from 'src/app/models/retailRateList';
import { Apiresponse } from 'src/app/ratelist-models';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import {RetailRate} from 'src/app/models/retailrate';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-moderatorretailratelist',
  templateUrl: './moderatorretailratelist.component.html',
  styleUrls: ['./moderatorretailratelist.component.scss']
})
export class ModeratorretailratelistComponent implements OnInit {
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
      processing: true
    };
    this.getUser();
  }
  getUser(): void {
    this.userService.getUserProfile().subscribe(
      (data:Apiresponse) => {
        this.user = data.data;
        this.userMandiId = this.user.Profile.mandiId;
        this.getRetailRateList(this.userMandiId);
      },
      error => {
        this.error = error;
        this.errorStatus = true;
      });
  }
  getRetailRateList(mandiId: number): void {
    this.loading = true;
    this.retailratelistService.getModeratorRetailRateList(mandiId).subscribe(
      (data: Apiresponse) => {
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
  moderatoraddratelist(): void {
    this.router.navigate(['moderator/retailratelist/editretailratelist',0]);
  }
  editRetailRateList(retailRateListId: number): void {
    this.router.navigate(['moderator/retailratelist/editretailratelist',retailRateListId]);
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
        this.getRetailRateList(this.userMandiId);
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
