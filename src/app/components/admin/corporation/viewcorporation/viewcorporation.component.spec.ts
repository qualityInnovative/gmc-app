import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcorporationComponent } from './viewcorporation.component';

describe('ViewcorporationComponent', () => {
  let component: ViewcorporationComponent;
  let fixture: ComponentFixture<ViewcorporationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcorporationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcorporationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
