import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentretailrateComponent } from './departmentretailrate.component';

describe('DepartmentretailrateComponent', () => {
  let component: DepartmentretailrateComponent;
  let fixture: ComponentFixture<DepartmentretailrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentretailrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentretailrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
