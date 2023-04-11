import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmenthomeComponent } from './deparmenthome.component';

describe('DeparmenthomeComponent', () => {
  let component: DeparmenthomeComponent;
  let fixture: ComponentFixture<DeparmenthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparmenthomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmenthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
