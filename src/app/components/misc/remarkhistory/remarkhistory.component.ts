import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { AssignComplaint } from 'src/app/models/assignComplaint';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Apiresponse } from 'src/app/ratelist-models';
@Component({
  selector: 'ratelist-remarkhistory',
  templateUrl: './remarkhistory.component.html',
  styleUrls: ['./remarkhistory.component.scss']
})
export class RemarkhistoryComponent implements OnInit {
  @Input() complaintId: number = 0;
  @Output() remarkSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() updatedRemark: any;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  assignComplaints: AssignComplaint[] = [];
  constructor(
    private complaintsService: ComplaintsService
  ) {}
  ngOnInit(): void {
    this.gettheRemarkHistory();
   }
 
  gettheRemarkHistory() {
    this.complaintsService
      .getComplaintRemarkHistory(this.complaintId)
      .subscribe(
        (response: Apiresponse) => {
          if (response.success) {
            this.assignComplaints = [];
            this.assignComplaints = response.data.sort((a: any, b: any) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            console.log(this.assignComplaints);
          }
        },
        (err) => {
          console.log(err);
        });
  }
  
 
}
