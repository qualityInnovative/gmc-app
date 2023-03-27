import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadminRetailratelistComponent } from './editadmin-retailratelist.component';

describe('EditadminRetailratelistComponent', () => {
  let component: EditadminRetailratelistComponent;
  let fixture: ComponentFixture<EditadminRetailratelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditadminRetailratelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditadminRetailratelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
