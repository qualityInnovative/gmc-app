import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { faEdit, faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { AssignComplaint } from 'src/app/models/assignComplaint';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Apiresponse } from 'src/app/ratelist-models';
import { ComplaintStatus } from 'src/app/models/complaintStatus';

@Component({
  selector: 'ratelist-remarkhistory',
  templateUrl: './remarkhistory.component.html',
  styleUrls: ['./remarkhistory.component.scss']
})
export class RemarkhistoryComponent implements OnInit {
  @Input() complaintId: number = 0;
  @Input() districtId: number = 0;
  @Output() remarkSubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Input() updatedRemark: any;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  assignComplaints: AssignComplaint[] = [];
  remarkhistory: any[] = [];
  currentUserId: number = 0;
  departmentUsers: any[] = [];
  complaintStaus: ComplaintStatus[] = [];
  constructor(
    private complaintsService: ComplaintsService
  ) { }
  ngOnInit(): void {
    this.getCurrentUser();
    this.getDepartmentUsers();
    this.getAllComplaintStatus();
   
  }
  getAllComplaintStatus(): void {
    this.complaintsService.getAllComplaintStatus()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          
          console.log('complaint status', res.data);
          this.complaintStaus = res.data;
        } else {
          console.log(res);
        }
      }, (err) => {
        console.log(err);
      });
  }
  getComplaintStatusFromId = (id: number) => {
    const status = this.complaintStaus.find((status) => status.id == id);
    return status?.status;
  }
  deleteRemark = (remarkId: number) => {
    console.log('delete remark', remarkId);
  }

  getDepartmentUsers(): void {
    this.complaintsService.getAllDeparmentUserFromComplainDistrict(this.districtId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          console.log('department users', res.data);
          this.departmentUsers = res.data;
          this.gettheRemarkHistory();
        } else {
          console.log(res);
        }
      }, (err) => {
        console.log(err);
      });
  }
  getUserNameFromId = (id: number) => {
    console.log('id', id);
    const user = this.departmentUsers.find((user) => user.id == id); 
    return user?.Profile?.firstName + ' ' + user?.Profile?.lastName;
  }
  getCurrentUser(): void {
    let user = localStorage.getItem('user') || '{}';
    this.currentUserId = JSON.parse(user).id;
  }
  extractHistoryFromRemarks = (complaints: AssignComplaint[]) => {
    console.log('extractHistoryFromRemarks', complaints);
    let remarkhistory: any[] = []
    complaints.forEach((complaint) => {
      const { assignedTo ,id, complaintStatusId, createdAt, createdBy, remarks } = complaint;
      if (createdBy === parseInt(assignedTo) && createdBy === this.currentUserId) {
        const historyObject = {
          id: id,
          createdBy: createdBy,
          description: 'you' + ' added a remark',
          createdAt: createdAt,
          remarks: remarks,
          complaintStatusId: complaintStatusId,
        };
        remarkhistory.push(historyObject);
      }
      else if (createdBy !== parseInt(assignedTo)) {
        const historyObject = {
          id: id,
          createdBy: createdBy,
          description: '"' + this.getUserNameFromId(createdBy) + '"' + ' added a remark',
          createdAt: createdAt,
          remarks: remarks,
          complaintStatusId: complaintStatusId,
        };
        remarkhistory.push(historyObject);
      } else if (createdBy !== parseInt(assignedTo)) {
        const historyObject = {
          id: id,
          createdBy: createdBy,
          description: '"' + this.getUserNameFromId(createdBy) + '"' + ' added a remark',
          createdAt: createdAt,
          remarks: remarks,
          complaintStatusId: complaintStatusId,
        };
        remarkhistory.push(historyObject);
      } else if (createdBy !== parseInt(assignedTo)) {
        const historyObject = {
          id: id,
          createdBy: createdBy,
          description: '"' + this.getUserNameFromId(createdBy) + '"' + ' added a remark',
          createdAt: createdAt,
          remarks: remarks,
          complaintStatusId: complaintStatusId,
        };
        remarkhistory.push(historyObject);
      }
    });
    return remarkhistory;
  };
  gettheRemarkHistory() {
    this.complaintsService
      .getComplaintRemarkHistory(this.complaintId)
      .subscribe(
        (response: Apiresponse) => {
          if (response.success) {
            this.assignComplaints = [];
            this.assignComplaints = response.data;
            this.remarkhistory = this.extractHistoryFromRemarks(this.assignComplaints);
            console.log('remark', this.remarkhistory);
          }
        },
        (err) => {
          console.log(err);
        });
  }
}