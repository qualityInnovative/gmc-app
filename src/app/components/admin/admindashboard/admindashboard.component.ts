import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintStatus } from 'src/app/models/complaintStatus';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
@Component({
  selector: 'ratelist-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {
  totalComplaintsReceived: number = 0;
  complaintsByStatus: any = {}; 
  selectedComplaintType: string = '0';
  complaintStatus: ComplaintStatus[] = [];
  constructor(
    private complaintsService: ComplaintsService
  ) { }

  ngOnInit(): void {
    this.getAllcomplaintsStatus();
    this.getAllcomplaintsToadminDashboard();
    
  }

  getAllcomplaintsStatus() {
    this.complaintsService.getAllComplaintStatus()
      .subscribe((res: any) => {
        this.complaintStatus = res.data;
      });
  }
  changeSelectedType(type: string) {
    let id = this.complaintStatus.find((status: ComplaintStatus) => status.status === type)?.id;
    this.selectedComplaintType = id?.toString() || '0';
    console.log(this.selectedComplaintType);

  }
  getAllcomplaintsToadminDashboard() {
    this.complaintsService.getAllComplaintsToadminDashboard()
      .subscribe((res: any) => {
        this.totalComplaintsReceived = res.data?.totalComplaintsReceived;
        this.complaintsByStatus = res.data?.complaintsByStatus;
      });
  }
  getProgress(status: string): number {
    if (this.totalComplaintsReceived === 0) {
      return 0;
    }
    const count = this.complaintsByStatus[status] || 0;
    return (count / this.totalComplaintsReceived) * 100;
  }


}
