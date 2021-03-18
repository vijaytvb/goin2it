import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorProvider implements HttpInterceptor {
  private _totalRequest : number = 0;
  constructor(private _loaderService : LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.show();
    this._totalRequest++;
    return next.handle(req).pipe(
      finalize(() =>{
          this._totalRequest--;
          if(this._totalRequest === 0)
            this._loaderService.hide();
      })
    );
  }
}

