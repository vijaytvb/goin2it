import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'web';
  public isLoading : boolean = false;
  constructor(private _loadingService : LoaderService){
    
  }
  
  ngOnInit(): void {
    this._loadingService.isLoading.subscribe((value : boolean)=>{
      this.isLoading = value;
    });
  }
}
