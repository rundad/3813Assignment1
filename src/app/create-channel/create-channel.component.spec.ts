import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateChannelComponent } from './create-channel.component';
import { RoutesService } from '../services/routes.service';
import { Router } from '@angular/router';

describe('CreateChannelComponent', () => {
  let component: CreateChannelComponent;
  let fixture: ComponentFixture<CreateChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateChannelComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
