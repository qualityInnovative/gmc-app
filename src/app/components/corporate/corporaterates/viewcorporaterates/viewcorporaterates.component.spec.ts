import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcorporateratesComponent } from './viewcorporaterates.component';

describe('ViewcorporateratesComponent', () => {
  let component: ViewcorporateratesComponent;
  let fixture: ComponentFixture<ViewcorporateratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcorporateratesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcorporateratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
