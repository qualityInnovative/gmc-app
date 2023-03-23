import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandiComponent } from './mandi.component';

describe('MandiComponent', () => {
  let component: MandiComponent;
  let fixture: ComponentFixture<MandiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
