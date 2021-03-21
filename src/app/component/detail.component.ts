import { Component, OnInit } from '@angular/core';
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
  constructor(private route : ActivatedRoute,
    private router : Router,
    private _dataService : DataService){

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
     this._candidate = candidates.filter(x=> x.candidateId.toLowerCase() == this._selectedCandidateId)[0];
     console.log(this._candidate);
    });
  }
}
