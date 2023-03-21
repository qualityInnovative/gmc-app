import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserratelistdashboardComponent } from './userratelistdashboard.component';

describe('UserratelistdashboardComponent', () => {
  let component: UserratelistdashboardComponent;
  let fixture: ComponentFixture<UserratelistdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserratelistdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserratelistdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
