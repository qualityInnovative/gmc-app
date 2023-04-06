import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandicommoditiesComponent } from './mandicommodities.component';

describe('MandicommoditiesComponent', () => {
  let component: MandicommoditiesComponent;
  let fixture: ComponentFixture<MandicommoditiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandicommoditiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandicommoditiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
