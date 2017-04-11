import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { ContestService } from './contest.service';

import { environment } from '../environments/environment';
import { ContestsComponent } from './contests/contests.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ContestsComponent,
    ContestDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    // InMemoryWebApiModule has to be last, enabled only in development mode
    !environment.production ? InMemoryWebApiModule.forRoot(InMemoryDataService) : []
  ],
  providers: [ ContestService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
