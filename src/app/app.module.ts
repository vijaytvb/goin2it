import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ListComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    DataService,
    LoaderService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorProvider, multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
