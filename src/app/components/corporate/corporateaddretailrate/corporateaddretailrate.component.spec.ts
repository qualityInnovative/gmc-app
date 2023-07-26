import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateaddretailrateComponent } from './corporateaddretailrate.component';

describe('CorporateaddretailrateComponent', () => {
  let component: CorporateaddretailrateComponent;
  let fixture: ComponentFixture<CorporateaddretailrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateaddretailrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateaddretailrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
