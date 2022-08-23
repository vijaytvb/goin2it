import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _httpClient:HttpClient) {
    
   }

   getCurrentElectionByCountry(countryId : string) : Observable<any>{
     return this._httpClient.get<any>('../assets/data/election.data.json');
   }

   getCandidateByConstituency(constituencyId : string) : Observable<any>{
    return this._httpClient.get<any>(`https://s3.ap-south-1.amazonaws.com/s-elect.goin2it.com/assets/data/${constituencyId}.json`);
   }

   getCandidateById(candidateId : string) : Observable<any>{
     return of('test');
   }

}
