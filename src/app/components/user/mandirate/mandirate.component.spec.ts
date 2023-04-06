import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandirateComponent } from './mandirate.component';

describe('MandirateComponent', () => {
  let component: MandirateComponent;
  let fixture: ComponentFixture<MandirateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandirateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandirateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
