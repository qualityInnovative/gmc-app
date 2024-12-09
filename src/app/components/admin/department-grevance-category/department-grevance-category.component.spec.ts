import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentGrevanceCategoryComponent } from './department-grevance-category.component';

describe('DepartmentGrevanceCategoryComponent', () => {
  let component: DepartmentGrevanceCategoryComponent;
  let fixture: ComponentFixture<DepartmentGrevanceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentGrevanceCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentGrevanceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
