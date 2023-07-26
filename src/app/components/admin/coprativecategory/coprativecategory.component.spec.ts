import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoprativecategoryComponent } from './coprativecategory.component';

describe('CoprativecategoryComponent', () => {
  let component: CoprativecategoryComponent;
  let fixture: ComponentFixture<CoprativecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoprativecategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoprativecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
