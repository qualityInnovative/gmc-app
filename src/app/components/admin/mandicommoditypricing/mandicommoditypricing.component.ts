import { Component, OnInit } from '@angular/core';
import { Apiresponse, District } from 'src/app/ratelist-models';
import { DistrictsService } from 'src/app/ratelist-services';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StatesService } from 'src/app/services/states/states.service';
import { State } from 'src/app/ratelist-models';
import { ToastrService } from 'ngx-toastr';
import { Mandicommoditypricing } from 'src/app/models/mandicommoditypricing';

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
  errorStatus = false;
  error = '';
  constructor(
    private router: Router,
    private statesService: StatesService,
    private toastr: ToastrService,
   
  ) { }
 

  ngOnInit(): void {}

  addMandiCommoditypricing() {
    this.router.navigate(['/admin/mandicommoditypricing/editmandicommoditypricing',0]);
  }
  editmandicommoditypricing() {}
  deletemandicommoditypricing() {}

}
