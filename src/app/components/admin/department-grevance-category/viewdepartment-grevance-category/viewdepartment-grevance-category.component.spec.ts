import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdepartmentGrevanceCategoryComponent } from './viewdepartment-grevance-category.component';

describe('ViewdepartmentGrevanceCategoryComponent', () => {
  let component: ViewdepartmentGrevanceCategoryComponent;
  let fixture: ComponentFixture<ViewdepartmentGrevanceCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdepartmentGrevanceCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdepartmentGrevanceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
