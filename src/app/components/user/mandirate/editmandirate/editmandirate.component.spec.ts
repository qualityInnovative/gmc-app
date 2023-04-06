import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmandirateComponent } from './editmandirate.component';

describe('EditmandirateComponent', () => {
  let component: EditmandirateComponent;
  let fixture: ComponentFixture<EditmandirateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmandirateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmandirateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
