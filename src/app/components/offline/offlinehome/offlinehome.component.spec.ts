import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinehomeComponent } from './offlinehome.component';

describe('OfflinehomeComponent', () => {
  let component: OfflinehomeComponent;
  let fixture: ComponentFixture<OfflinehomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflinehomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfflinehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
