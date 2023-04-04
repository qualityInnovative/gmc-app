import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorretailratelistComponent } from './moderatorretailratelist.component';

describe('ModeratorretailratelistComponent', () => {
  let component: ModeratorretailratelistComponent;
  let fixture: ComponentFixture<ModeratorretailratelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorretailratelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratorretailratelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
