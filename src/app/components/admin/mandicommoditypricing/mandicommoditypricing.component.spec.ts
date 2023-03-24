import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandicommoditypricingComponent } from './mandicommoditypricing.component';

describe('MandicommoditypricingComponent', () => {
  let component: MandicommoditypricingComponent;
  let fixture: ComponentFixture<MandicommoditypricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandicommoditypricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandicommoditypricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
