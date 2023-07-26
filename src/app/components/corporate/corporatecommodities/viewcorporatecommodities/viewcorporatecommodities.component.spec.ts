import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcorporatecommoditiesComponent } from './viewcorporatecommodities.component';

describe('ViewcorporatecommoditiesComponent', () => {
  let component: ViewcorporatecommoditiesComponent;
  let fixture: ComponentFixture<ViewcorporatecommoditiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcorporatecommoditiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcorporatecommoditiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
