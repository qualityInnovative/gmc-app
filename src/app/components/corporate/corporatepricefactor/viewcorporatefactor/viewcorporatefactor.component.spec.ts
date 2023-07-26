import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcorporatefactorComponent } from './viewcorporatefactor.component';

describe('ViewcorporatefactorComponent', () => {
  let component: ViewcorporatefactorComponent;
  let fixture: ComponentFixture<ViewcorporatefactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewcorporatefactorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewcorporatefactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
