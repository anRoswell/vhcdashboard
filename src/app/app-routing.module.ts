import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ErrorComponent } from './pages/error/error.component';

import { AuthGuard } from './guards/auth.guard';

import { SettingsRoutingModule } from './pages/admin/settings/settings.routing';
import { ParametersRoutingModule } from './pages/admin/parameters/parameters.routing';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [ AuthGuard ],
    component: AdminComponent,
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    SettingsRoutingModule,
    ParametersRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
