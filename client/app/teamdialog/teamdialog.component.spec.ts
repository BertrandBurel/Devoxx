import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamdialogComponent } from './teamdialog.component';

describe('TeamdialogComponent', () => {
  let component: TeamdialogComponent;
  let fixture: ComponentFixture<TeamdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
