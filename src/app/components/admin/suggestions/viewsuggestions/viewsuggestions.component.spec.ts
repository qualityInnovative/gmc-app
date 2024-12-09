import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsuggestionsComponent } from './viewsuggestions.component';

describe('ViewsuggestionsComponent', () => {
  let component: ViewsuggestionsComponent;
  let fixture: ComponentFixture<ViewsuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsuggestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewsuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
