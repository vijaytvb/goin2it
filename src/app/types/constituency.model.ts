export class CandidateProfile {
  public candidateId: string;
  public constituencyId: string;
  public constituencyName: string;
  public name: string;
  public age: number;
  public sex: string;
  public party: string;
  public address: string;
  public officialProfileLink: string;
  public officialPhotoLink: string;
  public languages: string[];
}

export class Promise {
  public language: string;
  public whyContest: string;
  public howDifferent: string;
  public whySelected: string;
  public whatSelected: string;
  public whatNotSelected: string;
}

export class Candidate extends CandidateProfile {
  public promises: Promise[];
}

export class Constituency {
  public candidates: Candidate[];
}

export class NewPromise extends Promise {
  public candidateId: string;
  public constituencyId: string;
}
