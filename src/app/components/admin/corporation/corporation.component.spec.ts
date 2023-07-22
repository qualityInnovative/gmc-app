import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporationComponent } from './corporation.component';

describe('CorporationComponent', () => {
  let component: CorporationComponent;
  let fixture: ComponentFixture<CorporationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
