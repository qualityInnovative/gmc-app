import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcorporatepriceadminComponent } from './viewcorporatepriceadmin.component';

describe('ViewcorporatepriceadminComponent', () => {
  let component: ViewcorporatepriceadminComponent;
  let fixture: ComponentFixture<ViewcorporatepriceadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcorporatepriceadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcorporatepriceadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
