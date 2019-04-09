import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CollapsiblePanelComponent } from './content-projection.component';

@Component({
  selector: 'app-test',
  template: `
    <div>
        <h1 title>I'm the title</h1>
        <div body>I'm the body</div>
    </div>
  `
})
class TestComponent {}

describe('ContentProjectionComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, CollapsiblePanelComponent]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly project the title', () => {
    expect(
      fixture.debugElement.query(By.css('div')).query(By.css('h1'))
        .nativeElement.innerHTML
    ).toContain('I\'m the title');
  });

  it('should correctly project the body', () => {
    expect(
      fixture.debugElement.query(By.css('div')).query(By.css('div'))
        .nativeElement.innerHTML
    ).toContain('I\'m the body');
  });
});
