import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersFormComponent } from '../users-form/users-form.component';

describe('UsersFormComponent', () => {
  let component: UsersFormComponent;
  let fixture: ComponentFixture<UsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
