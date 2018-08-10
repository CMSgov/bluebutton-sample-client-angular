﻿import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { EOBDetailComponent } from './eobdetail';
import { LoginComponent } from './login';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'eobdetail/:claimId', component: EOBDetailComponent },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);