import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/ratelist-models';
import { UnitsService } from 'src/app/services/units/units.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ratelist-editunits',
  templateUrl: './editunits.component.html',
  styleUrls: ['./editunits.component.scss']
})
export class EditunitsComponent implements OnInit {
  loading: boolean = true;
  error = '';
  errorStatus = 0;
  unit: Unit = new Unit();
  unitId: number = 0;
  edit: boolean = false;
  imageset: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private unitsService: UnitsService,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.isEdit();
  }
  isEdit(): boolean {
    this.route.params.subscribe(params => {
      this.unitId = params['unitId'];
      console.log(this.unitId)
      this.edit = this.unitId > 0;
    });
    if (this.unitId > 0) {
      this.unitsService.getUnitById(this.unitId).subscribe(
        (data) => {
          this.unit = data.data;
          console.log(this.unit)
          this.loading = false;
        },
        (error) => {
          this.error = error;
          this.errorStatus = error.status;
          this.loading = false;
        }
      )
    } else {
      this.loading = false;
    }
    return this.unitId > 0;
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = (event.target as any).result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          if (ctx) {
            const maxWidth = 800; // Set your desired maximum width
            const maxHeight = 600; // Set your desired maximum height
            let newWidth = img.width;
            let newHeight = img.height;
  
            // Calculate new dimensions while maintaining aspect ratio
            if (img.width > maxWidth) {
              newWidth = maxWidth;
              newHeight = (img.height * maxWidth) / img.width;
            }
            if (newHeight > maxHeight) {
              newHeight = maxHeight;
              newWidth = (img.width * maxHeight) / img.height;
            }
  
            canvas.width = newWidth;
            canvas.height = newHeight;
  
            // Draw the image on the canvas with the new dimensions
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
            // Convert the canvas content to a base64 string
            const resizedImageData = canvas.toDataURL('image/jpeg'); // Adjust format as needed
  
            // Now you can use 'resizedImageData' for uploading to the server
            this.unit.image = resizedImageData;
            console.log('Resized image dimensions:', newWidth, newHeight);
            console.log(this.unit.image);
          } else {
            // Handle the case where getContext('2d') returns null
            console.error('Could not get 2D context from canvas');
          }
        };
  
        img.onerror = (error) => {
          console.error('Error loading image:', error);
          // Handle the error, e.g., by displaying an error message to the user
        };
      };
  
      reader.readAsDataURL(event.target.files[0]); // Read file as data URL
    }
  }
  
  


  back() {
    this.location.back();
  }
  saveUnit() {
    if (this.isEdit()) {
      this.unitsService.updateUnit(this.unit).subscribe(
        (data) => {
          this.back();
        },
        (error) => {
          this.error = error;
        }
      )
    } else {
      this.unitsService.addUnit(this.unit).subscribe(
        (data) => {
          this.back();
        },
        (error) => {
          this.error = error;
        }
      )
    }
  }



}
