import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CorporationCommodity } from 'src/app/models/corporationcommodity';
import { CorporatecommoditiesService } from 'src/app/services/corporatecommodities/corporatecommodities.service';
import { Corporation } from 'src/app/models/corporation';
import { User } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import { CoprativeCategory } from 'src/app/models/coprativecategory';
import { CoperativecategoryService } from 'src/app/services/coperativecategory/coperativecategory.service';
import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-viewcorporatecommodities',
  templateUrl: './viewcorporatecommodities.component.html',
  styleUrls: ['./viewcorporatecommodities.component.scss']
})
export class ViewcorporatecommoditiesComponent implements OnInit {
  edit = false;
  faEye = faEye;
  CorporationCommodity: CorporationCommodity = new CorporationCommodity();
  loggedinuser: User = new User();
  corporationId: number = 0;
  imageset: boolean = false;
  CoprativeCategories: CoprativeCategory[] = [];
  units: Unit[] = [];
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private corporatecommoditiesService: CorporatecommoditiesService,
    private userService: UserService,
    private coperativecategoryService: CoperativecategoryService,
    private unitsService: UnitsService
  ) {
    this.loggedinuser = this.userService.getCurrentUser();
    this.corporationId = this.loggedinuser.CorporationId;
  }
  ngOnInit(): void {
    this.getallcoprativecategory();
    this.getallunits();
    this.isEdit();
  }
  getallunits() {
    this.unitsService.

      getUnits
      ().subscribe(
        (data) => {
          this.units = data.data;
          console.log(this.units);
        }
      )
  }

  getallcoprativecategory() {
    this.coperativecategoryService.
      getAllCoprativeCategories
      ().subscribe(
        (data) => {
          this.CoprativeCategories = data.data;
          console.log(this.CoprativeCategories);
        }
      )
  }
  isEdit() {
    this.route.params.subscribe(params => {
      if (params['id'] != 0) {
        console.log(params['id']);
        this.edit = true;
        this.getCoporateCommodity(params['id']);
      } else {
        this.edit = false;
      }
    });
  }
  back() {
    this.location.back();
  }
  getCoporateCommodity(id: number) {
    this.corporatecommoditiesService.getCoporateCommodity(id).subscribe(
      (data) => {
        if (data.success) {
          this.CorporationCommodity = data.data;
        } else {
          this.CorporationCommodity = new CorporationCommodity();
        }
      }
    )
  }
  saveCommodity() {
    if (this.edit) {
      this.update();

    }
    else {
      this.save();
    }
  }
  save() {
    this.CorporationCommodity.corporationId = this.corporationId;
    this.corporatecommoditiesService.saveCoporateCommodity(this.CorporationCommodity).subscribe(
      (data) => {
        if (data.success) {
          this.router.navigate(['corporate/corporatecommodities']);
        }
      }
    )
  }
  update() {
    this.corporatecommoditiesService.updateCoporateCommodity(this.CorporationCommodity).subscribe(
      (data) => {
        if (data.success) {
          this.router.navigate(['corporate/corporatecommodities']);
        }
      }
    )
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageset = true;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log(event.target.files[0]);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.CorporationCommodity.image = (event.target as any).result as string
        console.log(this.CorporationCommodity.image)
      }
    }
  }
}
