import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddremovecommodityfrommandiComponent } from './addremovecommodityfrommandi.component';

describe('AddremovecommodityfrommandiComponent', () => {
  let component: AddremovecommodityfrommandiComponent;
  let fixture: ComponentFixture<AddremovecommodityfrommandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddremovecommodityfrommandiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddremovecommodityfrommandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
