import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdistrictconfigurationComponent } from './editdistrictconfiguration.component';

describe('EditdistrictconfigurationComponent', () => {
  let component: EditdistrictconfigurationComponent;
  let fixture: ComponentFixture<EditdistrictconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdistrictconfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdistrictconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
