import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsListItemComponent } from './versions-list-item.component';

describe('VersionsListItemComponent', () => {
  let component: VersionsListItemComponent;
  let fixture: ComponentFixture<VersionsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
