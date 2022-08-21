import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer.component';
import { HeaderComponent } from './component/header.component';
import { ListComponent } from './component/list.component';
import { DetailComponent } from './component/detail.component';
import { DataService } from './service/data.service';
import { LoaderService } from './service/loader.service';
import { InterceptorProvider } from './provider/interceptor.provider';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisclaimerComponent } from './component/disclaimer.component';
import { CookieService } from 'ngx-cookie-service';
import { CandidatePromisesComponent } from './component/candidate-promises.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    DetailComponent,
	CandidatePromisesComponent,
    DisclaimerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
	ReactiveFormsModule,
	TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    DataService,
    LoaderService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorProvider, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

