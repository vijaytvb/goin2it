import { NewPromise } from './../types/constituency.model';
import { SelectService } from './../service/select.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from '../types/constituency.model';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-candidate-promises',
  templateUrl: './candidate-promises.component.html',
  styleUrls: ['./candidate-promises.component.scss']
})
export class CandidatePromisesComponent implements OnInit {

  public token: string;
  public decryptedToken: string;
  public candidate: Candidate;
  public candidateForm: FormGroup;
  public isImgHidden = false;
  public submitted = false;
  public isReadonly = true;
  public isSubmitted = false;
  public errorSaving = false;
  public responseLength = 500;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private selectService: SelectService, public translateService: TranslateService) {
    this.candidateForm = this.fb.group({
      language: [''],
      whyContest: ['', [Validators.required, Validators.minLength(this.responseLength), validateField]],
      howDifferent: ['', [Validators.required, Validators.minLength(this.responseLength), validateField]],
      whySelected: ['', [Validators.required, Validators.minLength(this.responseLength), validateField]],
      whatSelected: ['', [Validators.required, Validators.minLength(this.responseLength), validateField]],
      whatNotSelected: ['', [Validators.required, Validators.minLength(this.responseLength), validateField]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.processToken(this.token);
    });
    // this.route.queryParams.subscribe(queryParams => {
    //   if (queryParams['readonly'] === '1')
    //   this.isReadonly = true;
    // });
  }

  private processToken(token: string) {
    /**
     * For Buffer to work,
     * a. ran the command npm i --save-dev @types/node
     * b. in tsconfig.app.json file, added below under compiler options ,
     *    "types": ["node"],
     *    "typeRoots": ["node_modules/@types"]
     * c. in polyfills.ts, added below
     */
    this.decryptedToken = Buffer.from(token, 'base64').toString('binary');
    let parts = this.decryptedToken && this.decryptedToken.split('^');
    this.isReadonly = !(parts.length > 4 && parts[4] === 'f$f8er.@5e)r#9+"{!');
    this.getCandidateData(parts[0]);
  }

  private getCandidateData(constituencyId: string) {
    constituencyId && this.selectService.getCandidate(constituencyId, this.token).then(data => {
      if (data) {
        this.candidate = data;
        this.translateService.langs = [];
        this.translateService.addLangs([...this.candidate.languages.map(x => x.toLowerCase())]);
        this.translateService.setDefaultLang(this.translateService.langs[0]);
        this.onLanguageChange(this.candidate.languages[0]);
      } else {
        //if someone enters a url with bad/invalid constiuency id/candidate id, then redirect
        //your home screen. replace the navigation path 'home' according to your application
        this.router.navigate(['/list']);
      }
    });
  }

  public saveResponse() {
    if (this.isReadonly) return;
    this.submitted = true;
    this.errorSaving = false;
    if (this.candidateForm.invalid) {
      return;
    }
    let data: NewPromise = {
      candidateId: this.token,
      constituencyId: this.candidate.constituencyId,
      language: this.candidateForm.value.language,
      whyContest: this.candidateForm.value.whyContest.trim(),
      howDifferent: this.candidateForm.value.howDifferent.trim(),
      whySelected: this.candidateForm.value.whySelected.trim(),
      whatSelected: this.candidateForm.value.whatSelected.trim(),
      whatNotSelected: this.candidateForm.value.whatNotSelected.trim()
    };
    this.isSubmitted = true;
    this.selectService.savePromises(data)
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            //TO DO: do you need to do anything after save action succeeds?
          },
          error: (msg) => {
            this.isSubmitted = false;
            this.errorSaving = true;
          },
          complete: () => {
            this.isSubmitted = false;
          }
        });
  }

  public onLanguageChange(language: string) {
    this.errorSaving = false;
    this.translateService.use(language.toLowerCase());
    let loadPromise = this.candidate.promises.find(promise => promise.language === language);
    if (loadPromise) {
      this.candidateForm.setValue({
        language: language,
        whyContest: loadPromise.whyContest,
        howDifferent: loadPromise.howDifferent,
        whySelected: loadPromise.whySelected,
        whatSelected: loadPromise.whatSelected,
        whatNotSelected: loadPromise.whatNotSelected
      });
    } else {
      this.emptyFields();
    }
  }

  get cf() { return this.candidateForm.controls; }

  public reset() {
    this.submitted = false;
    this.onLanguageChange(this.candidate.languages[0]);
  }

  private emptyFields() {
    this.candidateForm.patchValue({
      whyContest: [''],
      howDifferent: [''],
      whySelected: [''],
      whatSelected: [''],
      whatNotSelected: ['']
    });
  }
}

export function validateField(control: AbstractControl) {
  if (control.value.toString().trim().length === 0) {
    return { emptyField: true };
  } else if (control.value.toString().trim().length < 500) {
    return { minlength: true };
  }
  return null;
}
