import { Component, OnInit, Input, Output, Version, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-versions-list',
  templateUrl: './versions-list.component.html',
  styleUrls: ['./versions-list.component.scss']
})
export class VersionsListComponent implements OnInit {

  @Input()
  versions: Version[];

  @Output()
  remove: EventEmitter<Version> = new EventEmitter();

  
  // @Output()
  // toggleComplete: EventEmitter<Version> = new EventEmitter();


  constructor() {
  }

  ngOnInit(): void {

  }

  // onToggleTodoComplete(todo: Todo) {
  //   this.toggleComplete.emit(todo);
  // }

  onRemoveVersion(version: Version) {
    this.remove.emit(version);
  }
}


