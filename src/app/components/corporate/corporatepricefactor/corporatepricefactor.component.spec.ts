import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatepricefactorComponent } from './corporatepricefactor.component';

describe('CorporatepricefactorComponent', () => {
  let component: CorporatepricefactorComponent;
  let fixture: ComponentFixture<CorporatepricefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporatepricefactorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatepricefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
