import { Component, OnInit } from '@angular/core';
import { Corporation } from 'src/app/models/corporation';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/ratelist-models';
import { District } from 'src/app/ratelist-models';
import { StatesService } from 'src/app/ratelist-services';
import { DistrictsService } from 'src/app/ratelist-services';

@Component({
  selector: 'ratelist-viewcorporation',
  templateUrl: './viewcorporation.component.html',
  styleUrls: ['./viewcorporation.component.scss']
})
export class ViewcorporationComponent implements OnInit {
  edit: boolean = false;
  states: State[] = [];
  districts: District[] = [];
  corporation: Corporation = new Corporation();
  constructor(
    private corporationService: CorporationService,
    private route: ActivatedRoute,
    private router: Router,
    private statesService: StatesService,
    private districtsService: DistrictsService
  ) { }

 

  ngOnInit(): void {
    this.isEdit();
    this.getAllStates();

    
  }
  isEdit() {
    this.route.params.subscribe(params => {
      if (params['id'] > 0) {
        this.edit = true;
        this.getCorporation(params['id']);
       
      } else {
        this.edit = false;
      }
    });
  }
  getCorporation(corporationId: number) {
    console.log(corporationId);
    this.corporationService.getCorporation(corporationId).subscribe((res: any) => {
      if (res.success) {
        this.corporation = res.data;
        console.log(this.corporation);
        if(this.corporation.stateId){
          this.getDistrictsByStateIdedit(this.corporation.stateId);
        }
      }else{
        this.corporation = new Corporation();
      }
    });
  }

  getAllStates() {
    this.statesService.admingetStates()
    .subscribe(
      (response: any) => {
        this.states= response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getDistrictsByStateIdedit(stateId: number) {
    this.districtsService.admingetDistrictsByStateId(stateId)
    .subscribe(
      (response: any) => {
        this.districts= response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getDistrictsByStateId(Event: any) {
    let stateId = Event.target.value;
    this.districtsService.admingetDistrictsByStateId(stateId)
    .subscribe(
      (response: any) => {
        this.districts= response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  back() {
    this.router.navigate(['/admin/corporation']);
  }
  saveCorporation() {
    if (this.edit) {
      this.corporationService.updateCorporation(this.corporation)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/admin/corporation']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.corporationService.saveCorporation(this.corporation)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.router.navigate(['/admin/corporation']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  


}
