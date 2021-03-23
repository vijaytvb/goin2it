export class Filter {
  sex : Sex;
  taxFilled : TaxFilled;
  case : Case;
  constructor (){
    this.case = new Case();
    this.sex = new Sex();
    this.taxFilled = new TaxFilled();
  }
}

export class Sex{
  male:boolean;
  female:boolean;
  other : boolean;
}

export class TaxFilled{
  yes:boolean;
  no:boolean;
}

export class Case {
  pendingCase : boolean;
  convictedCase : boolean;
}