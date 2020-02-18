import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './marerial-components';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PeopleService } from './services/people/people.service';
import { GraphQLModule } from './graphql.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SlimLoadingBarModule,
    InfiniteScrollModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'details/:id', component: DetailsComponent },
    ]),
    BrowserAnimationsModule,
    GraphQLModule
  ],
  providers: [
    PeopleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
