import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
    templateUrl: './disclaimer.component.html',
    selector: 'app-disclaimer'
})

export class DisclaimerComponent implements OnInit {
    private _disclaimerKey: string = 'DisclaimerAccepted';
    constructor(private _cookieSerivce: CookieService) {
    }
    ngOnInit(): void {
        if (!this._cookieSerivce.check(this._disclaimerKey)) {
            $('#disclaimer').modal('show');
        }

    }

    clickAgree(): void {
        this._cookieSerivce.set(this._disclaimerKey,'true',1);
        $('#disclaimer').modal('hide');
    }

}
