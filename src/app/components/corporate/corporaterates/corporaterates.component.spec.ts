import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateratesComponent } from './corporaterates.component';

describe('CorporateratesComponent', () => {
  let component: CorporateratesComponent;
  let fixture: ComponentFixture<CorporateratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateratesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporateratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
