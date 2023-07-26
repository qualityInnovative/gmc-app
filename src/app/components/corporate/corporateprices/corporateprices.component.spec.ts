import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatepricesComponent } from './corporateprices.component';

describe('CorporatepricesComponent', () => {
  let component: CorporatepricesComponent;
  let fixture: ComponentFixture<CorporatepricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporatepricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatepricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
