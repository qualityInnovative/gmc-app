import { Component, OnInit } from '@angular/core';
import { CorporateratesService } from 'src/app/services/corporaterates/corporaterates.service';
import { User ,Apiresponse,CorporateRates} from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import { Subject } from 'rxjs';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'ratelist-corporaterates',
  templateUrl: './corporaterates.component.html',
  styleUrls: ['./corporaterates.component.scss']
})
export class CorporateratesComponent implements OnInit {
  faEye = faEye;
  loading = false;
  errorStatus = false;
  error= '';
  corporateRates: CorporateRates[] = [];
  user: User=new User();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private corporateratesService: CorporateratesService,
    private userService: UserService,
    private router: Router
  ) { 
    this.user= this.userService.getCurrentUser();
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.getcorporateratesbycorporateId(this.user.CorporationId);
  }
  viewcorporaterates(id:number){
    this.router.navigate([`corporate/corporaterates/viewcorporaterates/${id}`]);
  }
  getcorporateratesbycorporateId(id: number) {
    this.corporateratesService.getcorporateratesbycorporateId(id).subscribe(
      (response: Apiresponse) => {
        this.corporateRates = response.data ;
        console.log(this.corporateRates);
        this.loading = false;
        this.dtTrigger.next(undefined);
      },
      (error) => {
        this.errorStatus = true;
        this.error = error.message;
        this.loading = false;
      }
    );
  }
  getDiscountprice(mrp:number,discount:number){
    if(discount==0 || discount==null || discount==undefined){
      return mrp;
    }
    let discountprice=0;
    discountprice=mrp-(mrp*(discount/100));
    return discountprice;
  }
}
