import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

export const appRoutes: Routes = [
  { path: '**', component: PageNotFoundComponent },
];
