import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatehomeComponent } from './corporatehome.component';

describe('CorporatehomeComponent', () => {
  let component: CorporatehomeComponent;
  let fixture: ComponentFixture<CorporatehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporatehomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
