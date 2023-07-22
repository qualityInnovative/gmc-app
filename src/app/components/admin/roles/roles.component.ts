import { Component, OnInit } from '@angular/core';
import {Role} from 'src/app/ratelist-models';
import {Subject} from 'rxjs';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';
import { RoleService } from 'src/app/services/role/role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ratelist-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles: Role[] = [];
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  faPenToSquare = faPenToSquare;

  constructor(
    private roleService: RoleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getAllRoles();
  }
  getAllRoles() {
    this.loading = true;
    this.roleService.getAllRoles()
      .subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          this.roles = res.data;
          this.dtTrigger.next(null);
        } else {
          this.errorStatus = true;
          this.error = res.message;
        }
      }, (err: any) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = err.message;
      });
  }
  addRole() {
    this.router.navigate(['/admin/roles/viewroles', 0]);

  }

  editRole(role: Role) {
    this.router.navigate(['/admin/roles/viewroles', role.id]);
  }
}
