import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { Constituency, Election, Item } from '../types/election';
import * as  _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import { Candidate } from '../types/candidate';
import { Case, Filter, Sex, TaxFilled } from '../types/filters';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  private _election: Array<Election> = new Array<Election>();
  public _electionList: Array<Item> = new Array<Item>();
  public _stateList: Array<Item> = new Array<Item>();
  public _districtList: Array<Item> = new Array<Item>();
  public _constituencyList: Array<Item> = new Array<Item>();
  public _candidateList: Array<Candidate> = new Array<Candidate>();
  public _filterCandidateList: Array<Candidate> = new Array<Candidate>();
  public _filters: Filter = new Filter();
  public _availableSex: Array<string> = new Array<string>();
  public _availableTaxFilled: Array<string> = new Array<string>();
  public _availableCase: Array<string> = new Array<string>();



  private _selectedElection: string = '';
  private _selectedState: string = '';
  private _selectedDistrict: string = '';
  public _selectedConstituency: string = '';
  private _sortOrder: string = 'ascending';
  private _sortColumn: string = 'age';


  constructor(private route: ActivatedRoute,
    private router: Router,
    private _dataService: DataService,
    private _title: Title) {

  }
  ngOnInit(): void {
    this._title.setTitle('s/Elect | Your next 5 years in 5 minutes. ')
    this._dataService.getCurrentElectionByCountry('india').subscribe((response: Array<Election>) => {
      this._electionList = _.sortBy(_.uniqBy(response, 'electionId').map(x => new Item(x.electionName, x.electionId)), 'text');
      this._stateList = _.sortBy(_.uniqBy(_.flatMap(response, 'constituencies'), 'stateId').map(x => new Item(x.stateName, x.stateId)), 'text');
      this._districtList = _.sortBy(_.uniqBy(_.flatMap(response, 'constituencies'), 'districtId').map(x => new Item(x.districtName, x.districtId)), 'text');
      this._constituencyList = _.sortBy(_.uniqBy(_.flatMap(response, 'constituencies'), 'constituencyId').map(x => new Item(x.constituencyName, x.constituencyId)), 'text');
      this._election = response;
      this._selectedElection = this._electionList[0].value;
      this._selectedState = this._stateList[0].value;
      this.loadDistrict();
      this.initFilter();
    });
  }

  initFilter() {
    this._filters.sex = new Sex();
    this._filters.case = new Case();
    this._filters.taxFilled = new TaxFilled();
    this._availableCase = new Array<string>();
    this._availableSex = new Array<string>();
    this._availableTaxFilled = new Array<string>();
    this._availableSex = _.uniqBy(this._candidateList, 'sex').map(x => x.sex.toLowerCase());
    if (this._candidateList.findIndex(x => x.latestTaxReturn != null) > -1) {
      this._availableTaxFilled.push("yes");
    }
    if (this._candidateList.findIndex(x => x.latestTaxReturn == null) > -1) {
      this._availableTaxFilled.push("no");
    }
    if (this._candidateList.findIndex(x => x.pendingCase != null) > -1) {
      this._availableCase.push("pendingCase");
    }
    if (this._candidateList.findIndex(x => x.convictedCase != null) > -1) {
      this._availableCase.push("convictedCase");
    }
  }

  applyFilter() {
    if (this._candidateList.length > 0) {
      this._filterCandidateList = this._candidateList.filter(x =>
        this._filters.sex.male ? x.sex.toLowerCase() == 'male' : true &&
          this._filters.sex.female ? x.sex.toLowerCase() == 'female' : true &&
            this._filters.sex.other ? x.sex.toLowerCase() == 'other' : true &&
              this._filters.taxFilled.yes ? x.latestTaxReturn : true &&
                this._filters.taxFilled.no ? !x.latestTaxReturn : true &&
                  this._filters.case.pendingCase ? x.pendingCase : true &&
                    this._filters.case.convictedCase ? x.convictedCase : true);
    }
  }

  onClickDetail(candidateId: string) {
    this.router.navigateByUrl(`detail/${this._selectedConstituency}/${candidateId}`);
  }

  onElectionSelect(event: any): void {
    this._selectedElection = event.target.value;
    this._stateList = _.sortBy(
      _.uniqBy(
        _.flatMap(
          this._election.filter(x => x.electionId == this._selectedElection), 'constituencies'), 'stateId')
        .map(x => new Item(x.stateName, x.stateId)), 'text');

    this._selectedState = this._stateList[0].value;
    this.loadDistrict();

  }

  onStateSelect(event: any): void {
    this._selectedState = event.target.value;;
    this.loadDistrict();
  }



  loadDistrict() {
    let result = this._election.filter(x => x.electionId == this._selectedElection);

    this._districtList = _.sortBy(
      _.uniqBy(
        _.flatMap(
          result, 'constituencies'), 'districtId').filter(x => x.stateId == this._selectedState)
        .map(x => new Item(x.districtName, x.districtId)), 'text');

    this._selectedDistrict = this._districtList[0].value;
    this.loadConstituency();

  }

  onDistrictSelect(event: any): void {
    this._selectedDistrict = event.target.value;
    this.loadConstituency();
  }

  loadConstituency() {
    let result = this._election.filter(x => x.electionId == this._selectedElection);
    this._constituencyList = _.sortBy(
      _.uniqBy(
        _.flatMap(
          result, 'constituencies'), 'constituencyId').filter(x => x.districtId == this._selectedDistrict && x.stateId == this._selectedState)
        .map(x => new Item(x.constituencyName, x.constituencyId)), 'text');

    this._selectedConstituency = this._constituencyList[0].value;
    this.loadConstituencyCandidate();
  }

  onConstituencySelect(event: any): void {
    this._selectedConstituency = event.target.value;
    this.loadConstituencyCandidate();
  }

  loadConstituencyCandidate(): void {
    this._dataService.getCandidateByConstituency(this._selectedConstituency).subscribe((response: any) => {
      this._candidateList = response.candidates;
      this._filterCandidateList = response.candidates;
      this.initFilter();
      this.applySort();
    }, (error: HttpErrorResponse) => {
      if (error.status == 404) {
        this._candidateList = new Array<Candidate>();
        this._filterCandidateList = new Array<Candidate>();
        this.initFilter();
      }
    });
  }

  onSortOrder(event: any): void {
    this._sortOrder = event.target.value;
    this.applySort();
  }

  onSortColumn(event: any): void {
    this._sortColumn = event.target.value;
    this.applySort()
  }

  applySort(): void {
    if (this._sortOrder == 'ascending') {
      this._filterCandidateList = _.sortBy(this._filterCandidateList, this._sortColumn)
    } else {
      this._filterCandidateList = _.sortBy(this._filterCandidateList, this._sortColumn).reverse();
    }
  }



}

