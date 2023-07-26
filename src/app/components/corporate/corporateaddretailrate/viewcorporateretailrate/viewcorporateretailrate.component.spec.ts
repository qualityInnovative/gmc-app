import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcorporateretailrateComponent } from './viewcorporateretailrate.component';

describe('ViewcorporateretailrateComponent', () => {
  let component: ViewcorporateretailrateComponent;
  let fixture: ComponentFixture<ViewcorporateretailrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcorporateretailrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcorporateretailrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
