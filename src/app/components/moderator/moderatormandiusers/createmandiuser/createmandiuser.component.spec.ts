import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatemandiuserComponent } from './createmandiuser.component';

describe('CreatemandiuserComponent', () => {
  let component: CreatemandiuserComponent;
  let fixture: ComponentFixture<CreatemandiuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatemandiuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatemandiuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
