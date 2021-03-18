import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  constructor(private route : ActivatedRoute,
    private router : Router,
    private _dataService : DataService){

  } 
  ngOnInit(): void {
    this._dataService.getCurrentElectionByCountry('india').subscribe((result :any) => {

    });
  }

  onClickDetail(candidateId : string){
   this.router.navigateByUrl(`detail/${candidateId}`);
  }

}

