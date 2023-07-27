import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcommoditydiscountComponent } from './addcommoditydiscount.component';

describe('AddcommoditydiscountComponent', () => {
  let component: AddcommoditydiscountComponent;
  let fixture: ComponentFixture<AddcommoditydiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcommoditydiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcommoditydiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
