import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoprativecategoryComponent } from './viewcoprativecategory.component';

describe('ViewcoprativecategoryComponent', () => {
  let component: ViewcoprativecategoryComponent;
  let fixture: ComponentFixture<ViewcoprativecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcoprativecategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcoprativecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
