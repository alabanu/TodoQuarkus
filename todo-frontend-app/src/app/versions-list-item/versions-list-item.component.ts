import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Version } from '../_models/version';

@Component({
  selector: 'app-versions-list-item',
  templateUrl: './versions-list-item.component.html',
  styleUrls: ['./versions-list-item.component.scss']
})
export class VersionsListItemComponent implements OnInit {

  @Input() version: Version;

  ngOnInit(): void {
  }


  @Output()
  remove: EventEmitter<Version> = new EventEmitter();

  constructor() {
  }

  removeVersion(version: Version) {
    this.remove.emit(version);
  }

}
