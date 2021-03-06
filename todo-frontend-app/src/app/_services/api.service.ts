import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Todo} from '../_models/todo';
import {Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Version } from '../_models/version';

const API_URL = environment.apiUrl;

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', `*`);

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define API
  apiURL = 'http://localhost:9191';

  constructor(private http: HttpClient) { }


  /*========================================
      CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  // HttpClient API get() method => Fetch todo list
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL + '/todos')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

// HttpClient API get() method => Fetch todo
  getTodoById(id): Observable<Todo> {
    return this.http.get<Todo>(this.apiURL + '/todos/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // HttpClient API post() method => Create todo
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiURL + '/todos', JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // HttpClient API put() method => Update todo
  updateTodo(todo): Observable<Todo> {
    return this.http.put<Todo>(this.apiURL + '/todos/' + todo.id, JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }



  // HttpClient API delete() method => Delete todo
  deleteTodoById(id: number) {
    return this.http.delete<Todo>(this.apiURL + '/todos/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // HttpClient API get() method => Fetch todo list
  getAllVersions(): Observable<Version[]> {
    return this.http.get<Version[]>(this.apiURL + '/version')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

// HttpClient API get() method => Fetch todo
  getVersionById(id): Observable<Version> {
    return this.http.get<Version>(this.apiURL + '/version/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // HttpClient API post() method => Create todo
  createVersion(version: Version): Observable<Version> {
    return this.http.post<Version>(this.apiURL + '/version', JSON.stringify(version), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


  // HttpClient API put() method => Update todo
  updateVersion(version): Observable<Version> {
    return this.http.put<Version>(this.apiURL + '/version/' + version.id, JSON.stringify(version), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }



  // HttpClient API delete() method => Delete todo
  deleteVersionById(id: number) {
    return this.http.delete<Version>(this.apiURL + '/version/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
