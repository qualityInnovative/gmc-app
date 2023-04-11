import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparmentaddretailratesComponent } from './deparmentaddretailrates.component';

describe('DeparmentaddretailratesComponent', () => {
  let component: DeparmentaddretailratesComponent;
  let fixture: ComponentFixture<DeparmentaddretailratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparmentaddretailratesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparmentaddretailratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
