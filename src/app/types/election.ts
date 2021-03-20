export class Election{ 
    constituencyType: string;
    countryId: string;
    electionId: string;
    electionName: string
    enabled: boolean;
    constituencies : Array<Constituency>;
}

export class Constituency {
    constituencyCode: string;
    constituencyId: string;
    constituencyName: string;
    constituencyType: string;
    districtCode: string;
    districtId: string;
    districtName: string;
    stateCode: string;
    stateId: string;
    stateName: string;
}

export class Item {
    text : string;
    value : string;
    constructor(_text : string , _value : string){
        this.text = _text;
        this.value = _value;
    }
}

