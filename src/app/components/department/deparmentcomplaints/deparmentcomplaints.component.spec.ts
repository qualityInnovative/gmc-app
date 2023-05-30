import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentcomplaintsComponent } from './deparmentcomplaints.component';

describe('DeparmentcomplaintsComponent', () => {
  let component: DeparmentcomplaintsComponent;
  let fixture: ComponentFixture<DeparmentcomplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparmentcomplaintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmentcomplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
