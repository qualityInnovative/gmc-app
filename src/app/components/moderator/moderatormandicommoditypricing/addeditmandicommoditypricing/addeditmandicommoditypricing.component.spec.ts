import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditmandicommoditypricingComponent } from './addeditmandicommoditypricing.component';

describe('AddeditmandicommoditypricingComponent', () => {
  let component: AddeditmandicommoditypricingComponent;
  let fixture: ComponentFixture<AddeditmandicommoditypricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditmandicommoditypricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditmandicommoditypricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
