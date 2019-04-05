import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YurekesleyComponent } from './yurekesley.component';

describe('YurekesleyComponent', () => {
  let component: YurekesleyComponent;
  let fixture: ComponentFixture<YurekesleyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YurekesleyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YurekesleyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
