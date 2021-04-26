import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import { Version } from '../_models/version';

@Injectable({
  providedIn: 'root'
})
export class VersionDataService {


  constructor(private api: ApiService) {
  }

  // Simulate POST /Version
  addVersion(version: Version): Observable<Version> {
    return this.api.createVersion(version);
  }

  // Simulate DELETE /version/:id
  deleteVersionById(versionId: number): Observable<Version> {
    return this.api.deleteVersionById(versionId);
  }

  // Simulate PUT /version/:id
  updateVersion(id , version: Version): Observable<Version> {
    return this.api.updateVersion(version);
  }

  // Simulate GET /Version
  getAllVersions(): Observable<Version[]> {
    return this.api.getAllVersions();
  }

  // Simulate GET /todos/:id
  getVersionById(versionId: number): Observable<Version> {
    return this.api.getVersionById(versionId);
  }

  // Toggle completed
//   toggleTodoComplete(version: Version) {
//     version = !todo.completed;
//     return this.api.updateTodo(todo);
//   }
}
