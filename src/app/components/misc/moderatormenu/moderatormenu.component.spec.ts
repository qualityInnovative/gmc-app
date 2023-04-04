import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratormenuComponent } from './moderatormenu.component';

describe('ModeratormenuComponent', () => {
  let component: ModeratormenuComponent;
  let fixture: ComponentFixture<ModeratormenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratormenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeratormenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
