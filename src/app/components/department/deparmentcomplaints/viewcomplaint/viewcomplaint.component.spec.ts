import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcomplaintComponent } from './viewcomplaint.component';

describe('ViewcomplaintComponent', () => {
  let component: ViewcomplaintComponent;
  let fixture: ComponentFixture<ViewcomplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcomplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcomplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
