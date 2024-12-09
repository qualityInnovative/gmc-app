import { Component, OnInit } from '@angular/core';
import { DepartmentGrevanceSubCategory } from 'src/app/models/DepartmentGrevanceSubCategory';
import { DepartmentGrevanceCategory } from 'src/app/models/DepartmentGrevanceCategory';
import { Router, ActivatedRoute } from '@angular/router';
import { DeparmentService } from 'src/app/services/departmant/deparment.service';
import { Department } from 'src/app/models/department';
import { faEdit, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from 'src/app/services/shared/shared.service';
import { Location } from '@angular/common';

@Component({
  selector: 'ratelist-viewsubcategory',
  templateUrl: './viewsubcategory.component.html',
  styleUrls: ['./viewsubcategory.component.scss']
})
export class ViewsubcategoryComponent implements OnInit {
  edit: boolean = false;
  faEdit = faEdit;
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  loading: boolean = false;
  errorStatus: boolean = false;
  error: string = '';
  deparmentGrevancesubId: number = 0;
  departments: Department[] = [];
  departmentGrevanceSubCategory: DepartmentGrevanceSubCategory = new DepartmentGrevanceSubCategory();
  departmentGrevanceCategory: DepartmentGrevanceCategory[] = [];
  filteredCategories: DepartmentGrevanceCategory[] = [];

  constructor(
    private router: Router,
    private departmentService: DeparmentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sharedService: SharedService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.deparmentGrevancesubId = params['id'];
      if (this.deparmentGrevancesubId != 0) {
        this.getSubCategoryById(this.deparmentGrevancesubId);
      }
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllDepartments();
  }

  // Fetch all departments
  getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      (res) => {
        if (res.success) {
          this.departments = res.data;
        }
      },
      (err) => {
        console.error('Error fetching departments:', err);
      }
    );
  }

  // Fetch all categories
  getAllCategory() {
    this.sharedService.getAllCategories()
    .subscribe(
      (res) => {
        this.departmentGrevanceCategory = res.data;
        this.filterCategories(this.departmentGrevanceSubCategory.departmentId);
      },
      (err) => {
        console.error('Error fetching categories:', err);
      }
    );
  }

  // Fetch subcategory by ID
  getSubCategoryById(id: number) {
    this.sharedService.getSubCategoryById(id).subscribe(
      (res) => {
        this.departmentGrevanceSubCategory = res.data;
       
        this.filterCategories(this.departmentGrevanceSubCategory.departmentId);
      },
      (err) => {
        console.error('Error fetching subcategory:', err);
      }
    );
  }

  onDepartmentChange(event: Event) {
    const selectedDepartmentId = (event.target as HTMLSelectElement).value;
    console.log(selectedDepartmentId)
    this.filterCategories(selectedDepartmentId); 
  }

  // Filter logic
  filterCategories(departmentId: string) {
    if (!departmentId) {
      this.filteredCategories = [];
      return;
    }
    this.filteredCategories = this.departmentGrevanceCategory.filter(
      (category) => category.departmentId == departmentId
    );
  }

  // Save or update the subcategory
  adddepartmentGrevanceSubCategory(id: number) {
    const payload = { ...this.departmentGrevanceSubCategory };
    if (id) {
      this.sharedService.updateSubCategory(payload)
      .subscribe(
        (res) => {
          console.log('Subcategory updated successfully', res);
          this.back();
        },
        (err) => {
          console.error('Error updating subcategory:', err);
        }
      );
    } else {
      this.sharedService.addSubCategory(payload).subscribe(
        (res) => {
          console.log('Subcategory added successfully', res);
          this.back();
        },
        (err) => {
          console.error('Error adding subcategory:', err);
        }
      );
    }
  }

  // Navigate back
  back() {
    this.location.back();
  }
}
