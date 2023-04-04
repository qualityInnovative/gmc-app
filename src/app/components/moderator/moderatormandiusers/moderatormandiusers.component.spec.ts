import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratormandiusersComponent } from './moderatormandiusers.component';

describe('ModeratormandiusersComponent', () => {
  let component: ModeratormandiusersComponent;
  let fixture: ComponentFixture<ModeratormandiusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratormandiusersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratormandiusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
