import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatecommoditiesComponent } from './corporatecommodities.component';

describe('CorporatecommoditiesComponent', () => {
  let component: CorporatecommoditiesComponent;
  let fixture: ComponentFixture<CorporatecommoditiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporatecommoditiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatecommoditiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
