  export interface Candidate {
    candidateId: string
    constituencyId: string
    name: string
    age: string
    sex: string
    caste: string
    party: string
    telephone: string
    email: string
    officialProfileLink: string
    officialPhotoLink: string
    socialMediaAccount: string
    selfProfession: string
    spouseProfession: string
    highestEducationLevel: string
    highestEducationYear: string
    latestTaxReturn: LatestTaxReturn
    pendingCase: PendingCase
    convictedCase: ConvictedCase
    assets: Assets
    liabilities: Liabilities
    candidateTotalWealthString: string
    candidateTotalIncomeString: string
    candidateTotalWealth: number
    candidateTotalIncome: number
  }
  
  export interface LatestTaxReturn {
    self: Self
    spouse: Spouse
    dependents: Dependent[]
  }
  
  export interface Self {
    year: string
    amount: string;
  }
  
  export interface Spouse {
    year: string
    amount: string
  }
  
  export interface Dependent {
    year: string
    amount: string
    relation: string
  }
  
  export interface PendingCase {
    firNumber: string
    policeStationName: string
    section: string
    briefDescription: string
    caseNumber: string
    courtName: string
    chargesFramed: boolean
    dateOfChargesFramed: string
    appealAgainstProceedings: boolean
    appealAgainstProceedingsDetails: string
    appealAgainstPunishment: boolean
  }
  
  export interface ConvictedCase {
    section: string
    briefDescription: string
    caseNumber: string
    courtName: string
    chargesFramed: boolean
    appealAgainstProceedings: boolean
    convictionOrderDate: string
    punishment: string
    appealAgainstPunishment: boolean
    appealAgainstPunishmentDetails: string
  }
  
  export interface Assets {
    movableSelf: MovableSelf
    movableSpouse: MovableSpouse
    movableDependents: MovableDependent[]
    immovableSelf: ImmovableSelf
    immovableSpouse: ImmovableSpouse
    immovableDependents: ImmovableDependent[]
    movableTotal: number
    immovableTotal: number
    candidateTotalAsset: number
    movableTotalString: string
    immovableTotalString: string
    candidateTotalAssetString: string
  }
  
  export interface MovableSelf {
    amount: string
  }
  
  export interface MovableSpouse {
    amount: string
  }
  
  export interface MovableDependent {
    amount: string
    relation: string
  }
  
  export interface ImmovableSelf {
    amount: string
  }
  
  export interface ImmovableSpouse {
    amount: string
  }
  
  export interface ImmovableDependent {
    amount: string
    relation: string
  }
  
  export interface Liabilities {
    self: Self2
    spouse: Spouse2
    dependents: Dependent2[]
    candidateTotalLiability: number
    candidateTotalLiabilityString: string
  }
  
  export interface Self2 {
    amount: string
  }
  
  export interface Spouse2 {
    amount: string
  }
  
  export interface Dependent2 {
    amount: string
    relation: string
  }
  