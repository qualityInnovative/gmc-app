import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AssignComplaint } from 'src/app/models/assignComplaint';
import { Notification } from 'src/app/models/notification';
import { NotificationType } from 'src/app/models/enums/notificationType';
import { NotificationService } from 'src/app/services/notification/notification.service';
@Component({
  selector: 'ratelist-complaintdetail',
  templateUrl: './complaintdetail.component.html',
  styleUrls: ['./complaintdetail.component.scss']
})
export class ComplaintdetailComponent implements OnInit {
  complainId: number = 0;
  notificationType = NotificationType;
  notification: Notification = new Notification();
  complaint: Complaint = new Complaint();
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  states: State[] = [];
  districts: District[] = [];
  latitudes: string = '';
  longitudes: string = '';
  markers: any = [];
  complaintStaus: ComplaintStatus[] = [];
  deparmentUsers: UserProfile[] = [];
  assignComplaint: AssignComplaint = new AssignComplaint();
  currentUser: UserProfile = new UserProfile();
  selectedUserId: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private complaintsService: ComplaintsService,
    private statesService: StatesService,
    private districtsService: DistrictsService,
    private notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.getAllstates();
    this.getAlldistricts();
    this.getAllComplaintStatus();
    this.route.params.subscribe(params => {
      this.complainId = params['id'];
      this.getComplainById();
    });
  }
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
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    maxZoom: 20,
    minZoom: 8,
  };
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }
  getAllComplaintStatus() {
    // Get all complaint status
    this.complaintsService
      .getAllComplaintStatus()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.complaintStaus = res.data;
        } else {
          console.log(res.message);
        }
      });
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
          console.log(this.complaint);
        }
      }, (err) => {
        console.log(err);
        this.loading = false;
      });
  }
  getAllstates() {
    // Get all states
    this.statesService
      .admingetStates()
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.states = res.data;
          console.log(this.states);
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
          console.log(this.districts);
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
    console.warn(districtId);
    this.complaintsService
      .getAllDeparmentUserFromComplainDistrict(districtId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.deparmentUsers = res.data;
          console.log(res.data);
        } else {
          console.log(res.message);
        }
      }
      );
  }
  back() {
    window.history.back();
  }
  saveComplaint() {
    // Save the complain
    console.log(this.assignComplaint);
    if (this.assignComplaint.assignedTo == null || this.assignComplaint.assignedTo == undefined || this.assignComplaint.assignedTo == "") {
      alert("Please assign the complaint to user");
      return;
    }
    if (this.assignComplaint.complaintId == null || this.assignComplaint.complaintId == undefined || this.assignComplaint.complaintId == 0) {
      alert("Please select the complaint");
      return;
    }
    this.assignComplaint.createdBy = this.currentUser.id;
    this.complaintsService
      .submitComplain(this.assignComplaint)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          alert(res.message);
          this.router.navigate(['/admin/complaints']);
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      });
  }
  assignToUser(e: any) {
    console.log(e?.id);
    let userId = e.id
    this.selectedUserId = parseInt(userId);
    this.assignComplaint.assignedTo = userId;
    console.log(userId);
    this.complaintsService
      .assignComplaintinacogs(userId, this.complainId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      });
   
  }
  changeStatus(e: any) {
    // change the status of complaint.Complaint status is changed by admin
    let ComplaintStatusId = e.id
    console.log(ComplaintStatusId, this.complainId);
    this.complaintsService
      .changeComplaintStatus(ComplaintStatusId, this.complainId)
      .subscribe((res: Apiresponse) => {
        if (res.success) {
          this.sendNotification(this.notification, ComplaintStatusId);
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      });
  }
  sendNotification(notification: Notification, ComplaintStatusId: any) {
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
