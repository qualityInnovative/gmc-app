import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Router } from '@angular/router';
import { DistrictsService, TehsilService } from 'src/app/ratelist-services';
import { Tehsil, District } from "./../../../ratelist-models"
@Component({
  selector: 'ratelist-tehsils',
  templateUrl: './tehsils.component.html',
  styleUrls: ['./tehsils.component.scss']
})
export class TehsilsComponent implements OnInit {
  loading: boolean = true;
  tehsils: Tehsil[] = [];
  districts: District[] = [];
  districtId: number = 0;
  error: string = "";
  errorStatus: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  constructor(
    private router: Router,
    private districtsService: DistrictsService,
    private tehsilService: TehsilService,
    private route: Router

  ) { }
  ngOnInit(): void {
    this.getTehsils();
    this.getDistricts();
  }
  getDistricts() {
    this.districtsService.admingetDistricts().subscribe((data: any) => {
      this.districts = data.data;
      
    })
  }
  getTehsils() {
    this.tehsilService.admingetalltehsils().subscribe((data: any) => {
      this.tehsils = data.data;

    })
  }
  addTehsil() {
    //admin/tehsils/edittehsil/763/0
    this.router.navigate(['/admin/tehsils/edittehsil', this.districtId, 0])
  }

  getDistrictName(districtId: number) {
    let district = this.districts.find(d => d.id == districtId);
    return district?.name;
  }
  editTehsil(tehsil: Tehsil) {
    console.log(tehsil)
    this.router.navigate(['/admin/tehsils/edittehsil', tehsil.districtId, tehsil.id])
  }
  deleteTehsil(tehsil: Tehsil) {
    this.tehsilService.admindeletetehsil(tehsil.id).subscribe((data: any) => {
      this.getTehsils();
    })
  }
}
