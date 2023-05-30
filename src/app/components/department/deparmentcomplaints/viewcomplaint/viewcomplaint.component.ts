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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private complaintsService: ComplaintsService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.getAllstates();
    this.getAlldistricts();
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
          this.getAllDeparmentUserFromComplainDistrict(this.complaint.districtId);
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
          this.deparmentUsers = res.data;
        } else {
          console.log(res.message);
        }
      }
      );
  }
  back() {
    window.history.back();
  }
  submitcomplaint() {
    if (this.assignComplaint.assignedTo == null || this.assignComplaint.assignedTo == undefined || this.assignComplaint.assignedTo == "") {
      // If user is not selected assing to current user
      this.assignComplaint.assignedTo = String(this.currentUserId)
    }
    if (this.assignComplaint.complaintId == null || this.assignComplaint.complaintId == undefined || this.assignComplaint.complaintId == 0) {
      alert("Please select the complaint");
      return;
    }
    this.complaintsService
      .submitComplain(this.assignComplaint)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          alert(res.message);
          this.assignComplaint.remarks = "";
          // @ts-ignore
          this.remarkHistoryComponent.gettheRemarkHistory() 
        } else {
          console.log(res.message);
        }
      });
  }
  assignToUser(e: Event) {
    // Assign the complain to user
    let userId = (e.target as HTMLSelectElement).value;
    this.assignComplaint.assignedTo = userId;

  }
  changeStatus(e: Event) {
    // change the status of complaint.Complaint status is changed by admin
    let ComplaintStatusId = (e.target as HTMLSelectElement).value;
    this.complaintsService
      .changeComplaintStatus(ComplaintStatusId, this.complainId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          console.log(res.message);
          //  code to send notification to user
          this.sendNotification(this.notification,ComplaintStatusId);
        } else {
          console.log(res.message);
        }
      });
  }
  sendNotification(notification: Notification,ComplaintStatusId:any) {
    // Send notification to user
    let complaintStatus = this.complaintStaus.find(x => x.id == ComplaintStatusId);
    this.notification.UserId = this.complaint.User.id;
    this.notification.type = NotificationType.Complaint;
    this.notification.description = "Your complaint status is changed to " + complaintStatus?.status;
    this.notification.title = "Complaint Status Changed";
    this.notification.notificationUniqueId = this.complaint.id;
    this.notification.createdAt = new Date();
    this.notificationService
      .sendNotification(notification)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      });
  }
}
