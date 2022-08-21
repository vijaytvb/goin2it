import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Candidate } from '../types/candidate';

@Component({
  templateUrl: './detail.component.html'
})
export class DetailComponent  implements OnInit {
  private _selectedConstituencyId :string = '';
  private _selectedCandidateId :string = '';
  public _candidate : Candidate;
  public _loaded : boolean = false;
  constructor(private route : ActivatedRoute,
    private router : Router,
    private _dataService : DataService,
    private _title: Title){

  }
  ngOnInit(): void {
    this.route.params.subscribe(prams  => {
      this._selectedConstituencyId = prams['constituencyId'];
      this._selectedCandidateId = prams['candidateid'];
      this.loadCandidate();
    });    
  }

  loadCandidate() : void {
    this._dataService.getCandidateByConstituency(this._selectedConstituencyId).subscribe((response : any) => {
     let candidates : Array<Candidate> = response.candidates;
	 console.log(this._selectedConstituencyId);
	 console.log(this._selectedCandidateId);
     this._candidate = candidates.filter(x=> x.candidateId == this._selectedCandidateId)[0];
     console.log(this._candidate);
     this._loaded = true;
     this._title.setTitle('s/Elect | ' + this._candidate.name);
    });
  }

  formatAmount(amount : string ) : number {
    return Number(amount.toString().replace(/,/g, ""));
  }
}
