import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewaddcommoditydiscountComponent } from './viewaddcommoditydiscount.component';

describe('ViewaddcommoditydiscountComponent', () => {
  let component: ViewaddcommoditydiscountComponent;
  let fixture: ComponentFixture<ViewaddcommoditydiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewaddcommoditydiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewaddcommoditydiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
