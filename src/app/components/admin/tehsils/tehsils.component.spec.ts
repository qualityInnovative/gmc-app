import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TehsilsComponent } from './tehsils.component';

describe('TehsilsComponent', () => {
  let component: TehsilsComponent;
  let fixture: ComponentFixture<TehsilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TehsilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TehsilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
