import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarkhistoryComponent } from './remarkhistory.component';

describe('RemarkhistoryComponent', () => {
  let component: RemarkhistoryComponent;
  let fixture: ComponentFixture<RemarkhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarkhistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemarkhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
