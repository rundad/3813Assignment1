import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a h2 field', async(()=>{
    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
    const complied = fixture.debugElement.nativeElement;
    expect(complied.querySelector('h2').textContent).toContain("{{userData.username}}'s Profile")
  }))
});
