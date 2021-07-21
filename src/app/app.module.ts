import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './commons/navbar/navbar.component';
import { LoadingComponent } from './commons/loading/loading.component';

import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ErrorComponent } from './pages/error/error.component';

import { SettingsModule } from './pages/admin/settings/settings.module';
import { ParametersModule } from './pages/admin/parameters/parameters.module';
import { MessageComponent } from './commons/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NavbarComponent,
    ErrorComponent,
    LoadingComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SettingsModule,
    ParametersModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
