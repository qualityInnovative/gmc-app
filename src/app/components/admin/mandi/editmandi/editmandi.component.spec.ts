import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmandiComponent } from './editmandi.component';

describe('EditmandiComponent', () => {
  let component: EditmandiComponent;
  let fixture: ComponentFixture<EditmandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmandiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
