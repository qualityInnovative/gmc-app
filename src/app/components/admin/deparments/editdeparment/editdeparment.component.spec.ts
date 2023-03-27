import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdeparmentComponent } from './editdeparment.component';

describe('EditdeparmentComponent', () => {
  let component: EditdeparmentComponent;
  let fixture: ComponentFixture<EditdeparmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdeparmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdeparmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
