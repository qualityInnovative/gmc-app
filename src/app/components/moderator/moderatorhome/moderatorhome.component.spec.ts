import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorhomeComponent } from './moderatorhome.component';

describe('ModeratorhomeComponent', () => {
  let component: ModeratorhomeComponent;
  let fixture: ComponentFixture<ModeratorhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
