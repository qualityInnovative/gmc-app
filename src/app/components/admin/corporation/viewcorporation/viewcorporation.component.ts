import { Component, OnInit } from '@angular/core';
import { Corporation } from 'src/app/models/corporation';
import { CorporationService } from 'src/app/services/corporation/corporation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/ratelist-models';
import { District } from 'src/app/ratelist-models';
import { StatesService } from 'src/app/ratelist-services';
import { DistrictsService } from 'src/app/ratelist-services';
@Component({
  selector: 'ratelist-viewcorporation',
  templateUrl: './viewcorporation.component.html',
  styleUrls: ['./viewcorporation.component.scss']
})
export class ViewcorporationComponent implements OnInit {
  edit: boolean = false;
  states: State[] = [];
  districts: District[] = [];
  corporation: Corporation = new Corporation();
  markers: any[] = [];
  saving: boolean = false;
  center: google.maps.LatLngLiteral = {
    // kashmir
    lat: 34.083656,
    lng: 74.797371
  };
  constructor(
    private corporationService: CorporationService,
    private route: ActivatedRoute,
    private router: Router,
    private statesService: StatesService,
    private districtsService: DistrictsService,
  ) { }
  ngOnInit(): void {
    this.isEdit();
    this.getAllStates();
  }
  isEdit() {
    this.route.params.subscribe(params => {
      if (params['id'] > 0) {
        this.edit = true;
        this.getCorporation(params['id']);

      } else {
        this.edit = false;
      }
    });
  }
  getCorporation(corporationId: number) {
    console.log(corporationId);
    this.corporationService.getCorporation(corporationId).subscribe((res: any) => {
      if (res.success) {
        this.corporation = res.data;
        console.log(this.corporation);
        this.markers = [
          {
            position: {
              lat: Number(this.corporation?.latitude),
              lng: Number(this.corporation?.longitude)
            },
            label: {
              color: 'red',
              text: 'Marker label ' + (this.corporation.name ? this.corporation.name : '')
            },
            title: 'Marker title ' + (this.corporation.name ? this.corporation.name : ''),
            options: {},
          },
        ];
        this.center = {
          lat: Number(this.corporation.latitude) ,
          lng: Number(this.corporation.longitude)
        };
        if (this.corporation.stateId) {
          this.getDistrictsByStateIdedit(this.corporation.stateId);
        }
      } else {
        this.corporation = new Corporation();
      }
    });
  }
  getAllStates() {
    this.statesService.admingetStates()
      .subscribe(
        (response: any) => {
          this.states = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getDistrictsByStateIdedit(stateId: number) {
    this.districtsService.admingetDistrictsByStateId(stateId)
      .subscribe(
        (response: any) => {
          this.districts = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  getDistrictsByStateId(Event: any) {
    let stateId = Event.target.value;
    this.districtsService.admingetDistrictsByStateId(stateId)
      .subscribe(
        (response: any) => {
          this.districts = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  back() {
    this.router.navigate(['/admin/corporation']);
  }
  saveCorporation() {
    this.saving = true;
    if (this.edit) {
      this.corporationService.updateCorporation(this.corporation)
        .subscribe(
          (response: any) => {
            if (response.success) {
              this.saving = false;
              this.router.navigate(['/admin/corporation']);

            }
          },
          (error) => {
            this.saving = false;
            console.log(error);
          }
        );
    } else {
      this.corporationService.saveCorporation(this.corporation)
        .subscribe(
          (response: any) => {
            if (response.success) {
              this.saving = false;
              this.router.navigate(['/admin/corporation']);
            }
          },
          (error) => {
            this.saving = false;
            console.log(error);
          }
        );
    }
  }
  display: any;
  zoom = 10;
  markerOptions: google.maps.MarkerOptions = { draggable: true };
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      console.log(event.latLng.toJSON());
      this.corporation.latitude = event.latLng.toJSON().lat + "";
      this.corporation.longitude = event.latLng.toJSON().lng + "";
    }
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
     this.markers=[
      {
        position: {
          lat: Number(this.corporation?.latitude),
          lng: Number(this.corporation?.longitude)
        },
        label: {
          color: 'red',
          text: 'Marker label ' + (this.corporation.name ? this.corporation.name : '')

        },
        title: 'Marker title ' + (this.corporation.name ? this.corporation.name : ''),
      },
     ]

  }
  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.corporation.image = (event.target as any).result as string
       
      }
    }
  }
 

}
