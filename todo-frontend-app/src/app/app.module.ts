import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoListFooterComponent} from './todo-list-footer/todo-list-footer.component';
import {TodoListHeaderComponent} from './todo-list-header/todo-list-header.component';
import {TodoListItemComponent} from './todo-list-item/todo-list-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from './_services/api.service';
import {TodoDataService} from './_services/todo-data.service';
import {AlertComponent } from './alert/alert.component';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './_helpers';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateRemainingPipe } from './pipes/date-remaining.pipe';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { VersionsListComponent } from './versions-list/versions-list.component';
import { VersionsListItemComponent } from './versions-list-item/versions-list-item.component';
import { VersionsListHeaderComponent } from './versions-list-header/versions-list-header.component';
import { VersionDataService } from './_services/version-data.service';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatCommonModule } from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoListFooterComponent,
    TodoListHeaderComponent,
    TodoListItemComponent,
    AlertComponent,
    HomeComponent,
    NavbarComponent,
    DateRemainingPipe,
    VersionsListComponent,
    VersionsListItemComponent,
    VersionsListHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CKEditorModule,
    MatTabsModule,
    MatIconModule,
    MatCommonModule
  ],
  providers: [TodoDataService, ApiService, HttpClientModule, VersionDataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
