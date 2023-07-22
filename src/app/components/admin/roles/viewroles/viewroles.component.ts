import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/ratelist-models';
import {Router, ActivatedRoute} from '@angular/router';
import { RoleService } from 'src/app/services/role/role.service';


@Component({
  selector: 'ratelist-viewroles',
  templateUrl: './viewroles.component.html',
  styleUrls: ['./viewroles.component.scss']
})
export class ViewrolesComponent implements OnInit {
  role: Role = new Role();
  edit: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {
    this.route.params.subscribe((params) => {
      if (params['id'] && params['id'] != 0) {
        this.edit = true;
        this.getRole(params['id']);
      }
    });
   }
    getRole(id: number) {
      this.roleService.getRole(id)
        .subscribe((res: any) => {
          if (res.success) {
            this.role = res.data;
          }
        });
    }
  

  ngOnInit(): void {}
  saveRole() {
    if (this.edit) {
      this.roleService.addRole(this.role)
        .subscribe((res: any) => {
          if (res.success) {
            this.back();
          }
        });
    } else {
      this.roleService.addRole(this.role)
        .subscribe((res: any) => {
          if (res.success) {
            this.back();
          }
        });
    }
  }
  back() {
    this.router.navigate(['/admin/roles']);
  }

}
