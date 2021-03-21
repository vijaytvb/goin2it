import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Constituency, Election, Item } from '../types/election';
import * as  _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { Candidate } from '../types/candidate';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  private _election : Array<Election> = new Array<Election>();
  public _electionList : Array<Item> = new Array<Item>();
  public _stateList : Array<Item> = new Array<Item>();
  public _districtList : Array<Item> = new Array<Item>();
  public _constituencyList : Array<Item> = new Array<Item>();
  public _candidateList : Array<Candidate> = new Array<Candidate>();

  private _selectedElection : string = '';
  private _selectedState : string = '';
  private _selectedDistrict : string = '';
  private _selectedConstituency : string = '';


  constructor(private route : ActivatedRoute,
    private router : Router,
    private _dataService : DataService){

  } 
  ngOnInit(): void {
    this._dataService.getCurrentElectionByCountry('india').subscribe((response :Array<Election>) => {
      this._electionList =  _.sortBy(_.uniqBy(response,'electionId').map(x=> new Item(x.electionName,x.electionId)),'text');
      this._stateList =  _.sortBy(_.uniqBy(_.flatMap(response,'constituencies'),'stateId').map(x=> new Item(x.stateName,x.stateId)),'text');
      this._districtList = _.sortBy(_.uniqBy(_.flatMap(response,'constituencies'),'districtId').map(x=> new Item(x.districtName,x.districtId)),'text');
      this._constituencyList = _.sortBy(_.uniqBy(_.flatMap(response,'constituencies'),'constituencyId').map(x=> new Item(x.constituencyName,x.constituencyId)),'text');
      this._election = response;
      this._selectedElection = this._electionList[0].value;
      this._selectedState = this._stateList[0].value;
      this.loadDistrict();
    });
  }

  onClickDetail(candidateId : string){
   this.router.navigateByUrl(`detail/${this._selectedConstituency}/${candidateId}`);
  }

  onElectionSelect(event : any) : void {
    this._selectedElection = event.target.value;
    this._stateList = _.sortBy(
      _.uniqBy(
        _.flatMap(
          this._election.filter(x=> x.electionId == this._selectedElection),'constituencies'),'stateId')
          .map(x=> new Item(x.stateName,x.stateId)),'text');

      this._selectedState = this._stateList[0].value;
      this.loadDistrict();
    
  }

  onStateSelect(event : any) : void {
    this._selectedState = event.target.value;;
    this.loadDistrict();
  }



  loadDistrict(){
    let result =  this._election.filter(x=> x.electionId == this._selectedElection);

    this._districtList = _.sortBy(
      _.uniqBy(
        _.flatMap(
          result,'constituencies'),'districtId').filter(x=>x.stateId == this._selectedState)
          .map(x=> new Item(x.districtName,x.districtId)),'text');

      this._selectedDistrict = this._districtList[0].value;
      this.loadConstituency();
    
  }

  onDistrictSelect(event : any) : void {
    this._selectedDistrict = event.target.value;
    this.loadConstituency();
  }

  loadConstituency(){
    let result =  this._election.filter(x=> x.electionId == this._selectedElection);
    this._constituencyList = _.sortBy(
      _.uniqBy(
        _.flatMap(
          result,'constituencies'),'constituencyId').filter(x=>x.districtId == this._selectedDistrict && x.stateId == this._selectedState)
          .map(x=> new Item(x.constituencyName,x.constituencyId)),'text');

    this._selectedConstituency = this._constituencyList[0].value;
    this.loadConstituencyCandidate();
  }

  onConstituencySelect(event : any) : void {
    this._selectedConstituency = event.target.value;
    this.loadConstituencyCandidate();
  } 

  loadConstituencyCandidate() : void {
    this._dataService.getCandidateByConstituency(this._selectedConstituency).subscribe((response : any) => {
      this._candidateList = response.candidates;
      console.log(this._candidateList);
    },(error:HttpErrorResponse) =>{
      if(error.status == 404){
        this._candidateList = new Array<Candidate>();
      }
    });
  }

}

