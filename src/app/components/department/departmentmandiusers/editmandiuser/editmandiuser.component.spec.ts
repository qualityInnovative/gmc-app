import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmandiuserComponent } from './editmandiuser.component';

describe('EditmandiuserComponent', () => {
  let component: EditmandiuserComponent;
  let fixture: ComponentFixture<EditmandiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmandiuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmandiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
