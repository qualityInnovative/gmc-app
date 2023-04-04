import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratordistricconfigurationComponent } from './moderatordistricconfiguration.component';

describe('ModeratordistricconfigurationComponent', () => {
  let component: ModeratordistricconfigurationComponent;
  let fixture: ComponentFixture<ModeratordistricconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratordistricconfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratordistricconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
