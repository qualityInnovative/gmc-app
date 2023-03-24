import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmandicommoditypricingComponent } from './editmandicommoditypricing.component';

describe('EditmandicommoditypricingComponent', () => {
  let component: EditmandicommoditypricingComponent;
  let fixture: ComponentFixture<EditmandicommoditypricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmandicommoditypricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmandicommoditypricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
