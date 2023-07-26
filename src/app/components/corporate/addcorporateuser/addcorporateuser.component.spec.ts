import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcorporateuserComponent } from './addcorporateuser.component';

describe('AddcorporateuserComponent', () => {
  let component: AddcorporateuserComponent;
  let fixture: ComponentFixture<AddcorporateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcorporateuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcorporateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
