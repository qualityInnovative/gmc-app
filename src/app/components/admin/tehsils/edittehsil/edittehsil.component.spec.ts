import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittehsilComponent } from './edittehsil.component';

describe('EdittehsilComponent', () => {
  let component: EdittehsilComponent;
  let fixture: ComponentFixture<EdittehsilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittehsilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittehsilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
