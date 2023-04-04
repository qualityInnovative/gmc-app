import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratormandicommoditypricingComponent } from './moderatormandicommoditypricing.component';

describe('ModeratormandicommoditypricingComponent', () => {
  let component: ModeratormandicommoditypricingComponent;
  let fixture: ComponentFixture<ModeratormandicommoditypricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratormandicommoditypricingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratormandicommoditypricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
