import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstatesComponent } from './editstates.component';

describe('EditstatesComponent', () => {
  let component: EditstatesComponent;
  let fixture: ComponentFixture<EditstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditstatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
