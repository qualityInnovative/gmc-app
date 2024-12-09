import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { faEdit, faTrash, faPenToSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ComplaintsService } from 'src/app/services/complaints/complaints.service';
import { Apiresponse, UserProfile } from 'src/app/ratelist-models';
import { Complaint } from 'src/app/models/complaint';
import { State } from 'src/app/ratelist-models';
import { District } from 'src/app/ratelist-models';
import { ComplaintStatus } from "src/app/models/complaintStatus"
import { StatesService } from 'src/app/ratelist-services';
import { DistrictsService } from 'src/app/ratelist-services';
import { AssignComplaint } from 'src/app/models/assignComplaint';
import { RemarkhistoryComponent } from 'src/app/components/misc/remarkhistory/remarkhistory.component';
import { Notification } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';
 import { NotificationType } from 'src/app/models/enums/notificationType';
 import { Location } from '@angular/common';
import { MandiService } from 'src/app/services/mandi/mandi.service';
@Component({
  selector: 'ratelist-viewcomplaint',
  templateUrl: './viewcomplaint.component.html',
  styleUrls: ['./viewcomplaint.component.scss']
})
export class ViewcomplaintComponent implements OnInit {
  @ViewChild(RemarkhistoryComponent) remarkHistoryComponent: RemarkhistoryComponent |undefined; // Reference to the child component
  // notificationtype enum
  notificationType = NotificationType;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  selectedUserId: number = 0;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  complaints: Complaint[] = [];
  complaintStaus: ComplaintStatus[] = [];
  states: State[] = [];
  districts: District[] = [];
  assignComplaints: AssignComplaint[] = [];
  currentUserId: number = 0;
  complaintIds: number[] = [];
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  assignComplaint: AssignComplaint = new AssignComplaint();
  complaint: Complaint = new Complaint();
  complainId: number = 0;
  latitudes: string = '';
  longitudes: string = '';
  markers: any = [];
  deparmentUsers: UserProfile[] = [];
  notification: Notification = new Notification();
  shouldGoBack: boolean = false;
  departments:any[]=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private complaintsService: ComplaintsService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private notificationService: NotificationService,
    private location: Location,
    private mandiService:MandiService
  ) { }
  ngOnInit(): void {
    this.currentUserId = JSON.parse(localStorage.getItem('user') || '{}').id;
    this.getAllstates();
    this.getAlldepartments();
    this.getAllComplaintStatus();
    this.route.params.subscribe(params => {
      this.complainId = params['id'];
      this.getComplainById();
    });
  }
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    maxZoom: 20,
    minZoom: 8,
  };
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  zoom = 18;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  getAlldepartments(){
    this.mandiService.getAlldepartments()
      .subscribe((res) => {
        console.log(res.data)
        this.departments=res.data
      })

  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
  getComplainById() {
    // Get the complain by ID
    this.loading = true;
    this.complaintsService
      .getComplaintById(this.complainId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.complaint = res.data;
          this.assignComplaint.complaintId = this.complaint.id;
          this.assignComplaint.complaintStatusId = this.complaint.ComplaintId;
          this.markers = [
            {
              position: {
                lat: parseFloat(this.complaint.latitude),
                lng: parseFloat(this.complaint.longitude),
              },
              label: {
                color: 'red',
                text: 'Marker label ' + (this.markers.length + 1),
              },
              title: 'Marker title ' + (this.markers.length + 1),
              //options: { animation: google.maps.Animation.BOUNCE },
            },
          ];
          this.latitudes = this.complaint.latitude
          this.longitudes = this.complaint.longitude
          this.getAllDeparmentUserFromComplainDistrict(this.complaint.departmentId);
          if (this.complaint.mediaType == 'image/jpeg' || this.complaint.mediaType == 'image/png') {
            this.complaint.media = 'data:' + this.complaint.mediaType + ';base64,' + this.complaint.media;
          } else {
            this.complaint.media = 'data:video/mp4;base64,' + this.complaint.media;
          }
          this.center = {
            lat: parseFloat(this.complaint.latitude),
            lng: parseFloat(this.complaint.longitude),
          };
          this.loading = false;

        }
      }, (err) => {
        console.log(err);
        this.loading = false;
      });
  }
  getAllComplaintStatus() {
    this.loading = true;
    this.complaintsService.getAllComplaintStatus().subscribe(
      (response: Apiresponse) => {
        this.loading = false;
        if (response.success) {
          this.complaintStaus = response.data;
        }
        else {
          this.errorStatus = true;
          this.error = response.message;
        }
      },
      (error) => {
        this.loading = false;
        this.errorStatus = true;
        this.error = error.message;
      }
    );
  }
  getAllstates() {
    // Get all states
    this.statesService
      .admingetStates()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.states = res.data;

        }
      }, (err) => {
        console.log(err);
      });
  }
  getAlldistricts() {
    // Get all districts
    this.districtsService
      .admingetDistricts()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.districts = res.data;

        }
      });
  }
  getStatefromId(id: number) {
    // Get state name from state id
    let state = this.states.find(x => x.id == id);
    return state?.name;
  }
  getDistrictfromId(id: number) {
    // Get district name from district id
    let district = this.districts.find(x => x.id == id);
    return district?.name;
  }
  getAllDeparmentUserFromComplainDistrict(districtId: number) {
    // Get all department user from complain district
    this.complaintsService
      .getAllDeparmentUserFromComplainDistrict(districtId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.deparmentUsers = res.data
          .filter((x:any) => x.id != this.currentUserId);
        } else {
          console.log(res.message);
        }
      }
      );
  }
  back() {
    window.history.back();
  }
  submitRemark() {
    if(this.assignComplaint.remarks == ""){
      alert("Please enter the remarks");
      return;
    }
    if (this.assignComplaint.assignedTo == "") {
      // If user is not selected assing to current user
      this.assignComplaint.assignedTo = String(this.currentUserId)
    }
    if (this.assignComplaint.complaintId == null || this.assignComplaint.complaintId == undefined || this.assignComplaint.complaintId == 0) {
      alert("Please select the complaint");
      return;
    }
    this.assignComplaint.createdBy = this.currentUserId;
    this.complaintsService
      .submitComplain(this.assignComplaint)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          alert(res.message);
          this.assignComplaint.remarks = "";
          // @ts-ignore
          this.remarkHistoryComponent.gettheRemarkHistory() 
          if(this.shouldGoBack){
            this.location.back();
          }
        } else {
          console.log(res.message);
        }
      });
  }
  assignToUser(e: any) {
    // Assign the complain to user
    let userId = e.id
    this.selectedUserId= parseInt(userId);
    this.assignComplaint.assignedTo = userId;
    this.shouldGoBack = true;
   // console.warn(this.assignComplaint);
    this.complaintsService
      .assignComplaintinacogs(userId, this.complainId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          console.log(res.message);
          alert(res.message);
        } else {
          console.log(res.message);
        }
      });
  }
  changeStatus(e: Event) {
    // change the status of complaint.Complaint status is changed by admin
    let ComplaintStatusId = (e.target as HTMLSelectElement).value;
    this.assignComplaint.complaintStatusId = ComplaintStatusId;
    console.warn(this.assignComplaint.complaintStatusId);
    this.complaintsService
      .changeComplaintStatus(ComplaintStatusId, this.complainId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          console.log(res.message);
          this.sendNotification(this.notification,ComplaintStatusId);
        } else {
          console.log(res.message);
        }
      });
  }
  sendNotification(notification: Notification,ComplaintStatusId:any) {
    // Send notification to user
    console.log(notification);
    let complaintStatus = this.complaintStaus.find(x => x.id == ComplaintStatusId);
    this.notification.UserId = this.complaint.User.id;
    this.notification.type = NotificationType.Complaint;
    this.notification.description = "Your complaint status is changed to " + complaintStatus?.status;
    this.notification.title = "Complaint Status Changed";
    this.notification.notificationUniqueId = this.complaint.id;
    this.notification.createdAt = new Date();
    console.log(this.notification);
    this.notificationService
      .sendNotification(notification)
      .subscribe((res: Apiresponse) => {
        console.warn(res);
        if (res.success) {
          console.log(res.message);
          console.log(res.data,this.shouldGoBack);
         
        } else {
          console.log(res);
        }
      });
  }
}
