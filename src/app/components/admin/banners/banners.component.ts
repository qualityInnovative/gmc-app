import { Component, OnInit } from '@angular/core';
import {faPlus, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { BannerService } from 'src/app/services/banner/banner.service';
import { Banner } from 'src/app/models/banner';
import { Subject } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'ratelist-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  loading = false;
  errorStatus = false;
  error= '';
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  banners: Banner[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private bannerService: BannerService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getBanners();
  }
  getBanners() {
    this.loading = true;
    this.bannerService.getBanners()
    .subscribe(
      (response) => {
        this.loading = false;
        this.banners = response.data;
        this.dtTrigger.next(undefined);
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error;
      })
  }
  addBanner() {}
  editBanner(id:number) {
    //admin/banners/editbanner/:id
    this.router.navigate([`admin/banners/editbanner/${id}`]);
  }
  deleteBanner(id:number) {
    if(confirm("Are you sure to delete?")) {
      this.bannerService.deleteBanner(id)
      .subscribe(
        (response) => {
          this.getBanners();
        },
        (error) => {
          console.log(error);
        })
    }
  }
}
