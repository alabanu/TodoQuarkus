import { Component, OnInit } from '@angular/core';
import { AccountService, TodoDataService } from '../_services';
import { Todo, User } from '../_models';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { VersionDataService } from '../_services/version-data.service';
import { Version } from '../_models/version';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  todos: Todo[] = [];
  versions: Version[] = [];
  name = 'Angular';
  selectedTabIndex: any;

  constructor(private todoDataService: TodoDataService,
    private accountService: AccountService,
    private versionDataService: VersionDataService) {
    this.accountService.user.subscribe(x => this.user = x);
  }


  ngOnInit(): void {
    this.todoDataService
      .getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos;
        }
      );

    this.versionDataService
      .getAllVersions()
      .subscribe(
        (versions) => {
          this.versions = versions;
          console.log(this.versions);
        }
      );
  }


  onAddTodo(todo) {
    this.todoDataService
      .addTodo(todo)
      .subscribe(
        (newTodo) => {
          this.todos = this.todos.concat(newTodo);
        }
      );
  }

  onToggleTodoComplete(todo) {
    this.todoDataService
      .toggleTodoComplete(todo)
      .subscribe(
        (updatedTodo) => {
          todo = updatedTodo;
        }
      );
  }

  onRemoveTodo(todo) {
    this.todoDataService
      .deleteTodoById(todo.id)
      .subscribe(
        (_) => {
          this.todos = this.todos.filter((t) => t.id !== todo.id);
        }
      );
  }

  onAddVersion(version) {
    this.versionDataService
      .addVersion(version)
      .subscribe(
        (newVersion) => {
          this.versions = this.versions.concat(newVersion);
        }
      );
  }

  onRemoveVersion(version) {
    this.versionDataService
      .deleteVersionById(version.id)
      .subscribe(
        (_) => {
          this.versions = this.versions.filter((t) => t.id !== version.id);
        }
      );
  }

  logout() {
    this.accountService.logout();
  }


}
