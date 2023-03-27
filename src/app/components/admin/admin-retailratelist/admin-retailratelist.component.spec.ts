import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetailratelistComponent } from './admin-retailratelist.component';

describe('AdminRetailratelistComponent', () => {
  let component: AdminRetailratelistComponent;
  let fixture: ComponentFixture<AdminRetailratelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRetailratelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRetailratelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
