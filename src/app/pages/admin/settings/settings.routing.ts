import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';

import { AdminComponent } from '../admin.component';

import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileFormComponent } from './profiles/profile-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';
import { CompanyFormComponent } from './company/company-form.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      { path: 'configuraciones/perfiles', component: ProfilesComponent },
      { path: 'configuraciones/perfil', component: ProfileFormComponent },
      { path: 'configuraciones/perfil/:id', component: ProfileFormComponent },
      { path: 'configuraciones/usuarios', component: UsersComponent },
      { path: 'configuraciones/usuario', component: UserFormComponent },
      { path: 'configuraciones/usuario/:id', component: UserFormComponent },
      { path: 'configuraciones/empresa', component: CompanyFormComponent },
      { path: 'configuraciones/empresa/:id', component: CompanyFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
