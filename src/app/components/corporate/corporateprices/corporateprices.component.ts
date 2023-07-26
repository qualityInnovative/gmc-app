import { Component, OnInit } from '@angular/core';
import { CorporationdiscountfactorService } from 'src/app/services/corporationdiscountfactor/corporationdiscountfactor.service';
import { Corporatepricefactor } from 'src/app/models/corporationdiscountfactor';
import { Subject } from 'rxjs';
@Component({
  selector: 'ratelist-corporateprices',
  templateUrl: './corporateprices.component.html',
  styleUrls: ['./corporateprices.component.scss']
})
export class CorporatepricesComponent implements OnInit {
  
  constructor(
   
  ) { }

  ngOnInit(): void {
   
  }
  

}
