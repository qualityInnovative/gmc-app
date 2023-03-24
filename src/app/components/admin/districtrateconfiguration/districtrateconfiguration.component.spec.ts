import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictrateconfigurationComponent } from './districtrateconfiguration.component';

describe('DistrictrateconfigurationComponent', () => {
  let component: DistrictrateconfigurationComponent;
  let fixture: ComponentFixture<DistrictrateconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictrateconfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistrictrateconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
