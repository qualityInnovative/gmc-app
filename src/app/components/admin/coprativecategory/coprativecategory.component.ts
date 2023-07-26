import { Component, OnInit } from '@angular/core';
import { CoprativeCategory } from 'src/app/models/coprativecategory';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CoperativecategoryService } from 'src/app/services/coperativecategory/coperativecategory.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'ratelist-coprativecategory',
  templateUrl: './coprativecategory.component.html',
  styleUrls: ['./coprativecategory.component.scss']
})
export class CoprativecategoryComponent implements OnInit {
  loading = false;
  error = '';
  faEdit = faEdit;
  faTrash = faTrash;
  errorStatus = 0;
  coprativecategory: CoprativeCategory[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private coprativecategoryService: CoperativecategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCoprativeCategories();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }
  getAllCoprativeCategories() {
    this.loading = true;
    this.coprativecategoryService.getCoprativeCategories().subscribe(
      (response: Apiresponse) => {
        this.loading = false;
        this.coprativecategory = response.data;
        this.dtTrigger.next(undefined);
      },
      (error) => {
        this.loading = false;
        this.error = error;
        this.errorStatus = error.status;
      }
    );
  }
  addCategory() { 
    this.router.navigate(['admin/coprativecategory/editcoprativecategory', 0]);
  }
  editCategory(id: number) {
    this.router.navigate(['admin/coprativecategory/editcoprativecategory', id]);
   }
  deleteCategory(id: number) {
    if (confirm("Are you sure to delete?")) {
      this.coprativecategoryService.deleteCoprativeCategory(id).subscribe(
        (response: Apiresponse) => {
          this.getAllCoprativeCategories();
        },
        (error) => {
          this.error = error;
          this.errorStatus = error.status;
        }
      );
    }
   }

}
