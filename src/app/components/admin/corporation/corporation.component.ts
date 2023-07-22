import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Corporation } from 'src/app/models/corporation';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { Subject } from 'rxjs';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Apiresponse } from 'src/app/ratelist-models';
@Component({
  selector: 'ratelist-corporation',
  templateUrl: './corporation.component.html',
  styleUrls: ['./corporation.component.scss']
})
export class CorporationComponent implements OnInit {
  corporations: Corporation[] = [];
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  constructor(private corporationService: CorporationService, private router: Router) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getCorporations();
  }


  getCorporations(): void {
    this.loading = true;
    this.corporationService.getCorporations()
      .subscribe(
        (response: any) => {
          this.corporations = response.data;
          
          this.loading = false;
        },
        (error) => {
          this.errorStatus = true;
          this.error = error;
          this.loading = false;
        }
      );
  }
  addCorporation() {
    this.router.navigate(['/admin/corporation/viewcorporation', 0]);
  }
  editCorporation(id: number) {
    this.router.navigate(['/admin/corporation/viewcorporation', id]);
  }
  deleteCorporation(id: number) {
    if (confirm('Are you sure want to delete?')) {
      this.corporationService.deleteCorporation(id)
        .subscribe((res: Apiresponse) => {
          if (res.success) {
            this.getCorporations();
          }
        });
    }
  }

}
