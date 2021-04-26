import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsListHeaderComponent } from './versions-list-header.component';

describe('VersionsListHeaderComponent', () => {
  let component: VersionsListHeaderComponent;
  let fixture: ComponentFixture<VersionsListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
