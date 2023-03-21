import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcommoditiesComponent } from './editcommodities.component';

describe('EditcommoditiesComponent', () => {
  let component: EditcommoditiesComponent;
  let fixture: ComponentFixture<EditcommoditiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcommoditiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcommoditiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
