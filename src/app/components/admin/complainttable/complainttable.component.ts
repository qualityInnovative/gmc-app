import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ratelist-complainttable',
  templateUrl: './complainttable.component.html',
  styleUrls: ['./complainttable.component.scss']
})
export class ComplainttableComponent implements OnInit, OnChanges {
  @Input() complaintType: string = '0'; // Input from parent
  data: any = { rows: [], count: 0 };
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

  constructor(private complaintsService: ComplaintsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initial load when the component is created
    this.getSortedComplaintsbyType(this.complaintType, this.itemsPerPage, this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Detect when complaintType changes and reload complaints
    if (changes['complaintType']) {
      this.getSortedComplaintsbyType(this.complaintType, this.itemsPerPage, this.currentPage);
    }
  }

  getSortedComplaintsbyType(complaintType: string, perPage: number, page: number) {
    this.complaintsService.getSortedComplaintsbyType(complaintType, perPage, page)
      .subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
        this.totalPages = Math.ceil(res.totalRecords / this.itemsPerPage);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    
      });
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getSortedComplaintsbyType(this.complaintType, this.itemsPerPage, this.currentPage);
    }
  }
  navigateToComplaintDetail(complaintId: number): void {
    this.router.navigate([`admin/complaints/complaindetail/${complaintId}`]);
  }
}
