import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CorporateRates } from 'src/app/ratelist-models';
import { CorporateratesService } from 'src/app/services/corporaterates/corporaterates.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ratelist-viewcorporaterates',
  templateUrl: './viewcorporaterates.component.html',
  styleUrls: ['./viewcorporaterates.component.scss']
})
export class ViewcorporateratesComponent implements OnInit {
  corporateRates: CorporateRates = new CorporateRates();
  corporateRatesid: number = 0;
  corporateRatesdiscount: number = 0;
  constructor(
    private location: Location,
    private corporaterate: CorporateratesService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe
      (params => {
        this.corporateRatesid = params['id'];
        console.log(this.corporateRatesid);
      });
  }
  ngOnInit(): void {
    this.getcorporateratesbycorporateId(this.corporateRatesid);
  }
  back() {
    this.location.back();
  }
  getcorporateratesbycorporateId(id: number) {
    this.corporaterate.getcorporateratebyid(id).subscribe(
      (response) => {
        this.corporateRates = response.data as CorporateRates;
        this.corporateRatesdiscount=this.getDiscountprice(this.corporateRates.mrp, this.corporateRates.CorporateCommoditydiscount.discount);
        console.log(this.corporateRates);
      },
      (error) => {
        console.log(error);
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
