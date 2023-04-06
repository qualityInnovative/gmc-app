import { Component, OnInit } from '@angular/core';
import { Mandicommoditypricing } from 'src/app/ratelist-models';
import { MandicommoditiesService } from 'src/app/services/mandicommodities/mandicommodities.service';
import { UserService } from 'src/app/services/user/user.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserProfile } from 'src/app/ratelist-models';
import { MandicommoditypricingService } from 'src/app/services/mandicommoditypricing/mandicommoditypricing.service';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Mandicommoditypricingmoderator } from 'src/app/models/mandicommoditypricingmoderator';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ratelist-moderatormandicommoditypricing',
  templateUrl: './moderatormandicommoditypricing.component.html',
  styleUrls: ['./moderatormandicommoditypricing.component.scss']
})
export class ModeratormandicommoditypricingComponent implements OnInit {
  user: UserProfile = new UserProfile();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  mandicommoditypricing: Mandicommoditypricingmoderator[] = [];
  mandiId: number = 0;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  constructor(
    private mandicommoditiesService: MandicommoditiesService,
    private userService: UserService,
    private router: Router,
    private mandicommoditypricingService: MandicommoditypricingService,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile() {
    this.userService.getUserProfile().subscribe(
      (data: Apiresponse) => {
        console.log(data.data.Profile.mandiId);
        this.mandiId = data.data.Profile.mandiId;
        this.getMandiCommodityPricing(this.mandiId);
      },
      (error) => {
        console.log(error);
      })
  }
  getMandiCommodityPricing(mandiId: number) {
    this.mandicommoditypricingService.getModeratorMandiCommodityPricing(mandiId).subscribe(
      (data: any) => {
        console.log(data)
        this.mandicommoditypricing = data.data;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  moderatoraddcommoditypricing() {
    this.router.navigate(['moderator/mandicommoditypricing/editmandicommoditypricing', 0]);
  }
  editCommoditypricing(id: number) {
    this.router.navigate([
      'moderator/mandicommoditypricing/editmandicommoditypricing', id
    ])
  }
  deleteCommodityPricining(id: number) {
    if (!confirm("Are you sure to delete this record?")) {
      return;
    } else {
      this.mandicommoditypricingService.deleteMandiCommodityPricing(id).subscribe(
        (data: any) => {
          console.log(data)
          this.getMandiCommodityPricing(this.mandiId);
          this.toastr.success('Commodity Pricing Deleted Successfully', 'Success');
        },
        (error) => {
          console.log(error);
        })
    }
  }
}
