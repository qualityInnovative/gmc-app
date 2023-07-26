import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatepricefactoradminComponent } from './corporatepricefactoradmin.component';

describe('CorporatepricefactoradminComponent', () => {
  let component: CorporatepricefactoradminComponent;
  let fixture: ComponentFixture<CorporatepricefactoradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporatepricefactoradminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatepricefactoradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
