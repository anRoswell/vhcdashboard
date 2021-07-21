import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfilesComponent } from './profiles/profiles.component';
import { ProfileFormComponent } from './profiles/profile-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';
import { CompanyFormComponent } from './company/company-form.component';

@NgModule({
  declarations: [
    ProfilesComponent,
    ProfileFormComponent,
    UsersComponent,
    UserFormComponent,
    CompanyFormComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class SettingsModule {}
