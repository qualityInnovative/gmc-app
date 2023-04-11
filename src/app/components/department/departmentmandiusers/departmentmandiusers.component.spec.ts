import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmandiusersComponent } from './departmentmandiusers.component';

describe('DepartmentmandiusersComponent', () => {
  let component: DepartmentmandiusersComponent;
  let fixture: ComponentFixture<DepartmentmandiusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentmandiusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentmandiusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
