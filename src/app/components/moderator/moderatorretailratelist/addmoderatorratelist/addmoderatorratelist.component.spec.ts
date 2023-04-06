import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoderatorratelistComponent } from './addmoderatorratelist.component';

describe('AddmoderatorratelistComponent', () => {
  let component: AddmoderatorratelistComponent;
  let fixture: ComponentFixture<AddmoderatorratelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmoderatorratelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmoderatorratelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
