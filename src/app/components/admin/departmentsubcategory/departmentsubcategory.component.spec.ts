import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsubcategoryComponent } from './departmentsubcategory.component';

describe('DepartmentsubcategoryComponent', () => {
  let component: DepartmentsubcategoryComponent;
  let fixture: ComponentFixture<DepartmentsubcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsubcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentsubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
