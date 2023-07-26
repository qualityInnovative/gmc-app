import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporatemenuComponent } from './corporatemenu.component';

describe('CorporatemenuComponent', () => {
  let component: CorporatemenuComponent;
  let fixture: ComponentFixture<CorporatemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporatemenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorporatemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
