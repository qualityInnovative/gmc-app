import { Component, OnInit } from '@angular/core';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BannerService } from 'src/app/services/banner/banner.service';
import { Banner } from 'src/app/models/banner';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Apiresponse } from 'src/app/ratelist-models';
import { UserService } from 'src/app/ratelist-services';
import { StatesService } from 'src/app/ratelist-services';
import { State } from 'src/app/ratelist-models';

@Component({
  selector: 'ratelist-editbanner',
  templateUrl: './editbanner.component.html',
  styleUrls: ['./editbanner.component.scss']
})
export class EditbannerComponent implements OnInit {
  edit: boolean = false;
  userId: number = 0;
  banner: Banner = new Banner();
  states: State[] = [];
  constructor(
    private bannerService: BannerService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private stateService: StatesService
  ) {
    this.userId = this.userService.getCurrentUser().id;
    this.getAllStates();
  }

  ngOnInit(): void {
    this.isEdit();

  }
  getAllStates() {
    this.stateService
      .admingetStates()
      .subscribe(
        (response: Apiresponse) => {
          this.states = response.data;

        },
        (error) => {
          console.log(error);
        })
  }


  isEdit() {
    this.route.params.subscribe(params => {
      this.banner.id = params['id'];
      if (this.banner.id > 0) {
        this.edit = true;
        this.getBanner(this.banner.id);
      } else {
        this.edit = false;
        this.banner.createdBy = this.userId;
      }
    });
  }
  getBanner(id: number) {
    this.bannerService.getBanner(id)
      .subscribe(
        (response: Apiresponse) => {
          this.banner = response.data;
          this.banner.startDate = new Date(this.banner.startDate).toISOString().substring(0, 10)
          this.banner.endDate = new Date(this.banner.endDate).toISOString().substring(0, 10)
        },
        (error) => {
          console.log(error);
        })
  }

  back() {
    this.router.navigate(['admin/banners']);
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.uploadCategoryImage(file);
    }
  }

  uploadCategoryImage(file: File) {
    this.bannerService.uploadbannerimage(file).subscribe(
      (response) => {
        if (response.success) {
          this.banner.image = response.data.path;
        } else {
          console.log(response.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getImageUrl(image: string) {
    console.log(`${environment.folderPath}${image}`);
    return `${environment.folderPath}${image}`;
  }
  
  
  saveBanner() {
    console.log(this.banner)
    if (this.edit) {
      this.updateBanner();
    } else {
      this.addBanner();
    }
  }
  addBanner() {
    this.bannerService.addBanner(this.banner)
      .subscribe(
        (response: Apiresponse) => {
          this.router.navigate(['admin/banners']);
        },
        (error) => {
          console.log(error);
        })
  }
  updateBanner() {
    this.bannerService.updateBanner(this.banner)
      .subscribe(
        (response) => {
          this.router.navigate(['admin/banners']);
        },
        (error) => {
          console.log(error);
        })
  }
}
