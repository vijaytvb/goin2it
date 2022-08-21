import { environment } from './../../environments/environment';
import { Constituency, Candidate, NewPromise } from './../types/constituency.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  constructor(private http: HttpClient) { }

  public async getCandidate(constituencyId: string, candidateId: string): Promise<Candidate | null | undefined> {
    try {
      return await import('../../assets/data/' + constituencyId + '.json').then((data: Constituency) => {
        if (data && data.candidates && data.candidates.length > 0) {
          return data.candidates.find(x => x.candidateId === candidateId);
        }
        return null;
      });
    } catch {
      return null;
    }
  }

  public savePromises(promise: NewPromise) {
    return this.http.post(environment.api, {
      promise
    });
  }
}
