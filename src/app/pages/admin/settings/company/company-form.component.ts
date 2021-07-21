import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styles: [],
})
export class CompanyFormComponent implements OnInit {
  public form: FormGroup;
  public id: number;
  public title: string;
  public companies: any;
  public identificationTypes: any;
  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      alias: ['', Validators.required],
      identificationTypeId: ['', [Validators.required]],
      identificationNumber: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
      address: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      mobile: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      taxes: ['', [Validators.required]],
      slogan: ['', [Validators.required]],
      message: ['', [Validators.required]],
      status: [true],
    });

    this.title = 'Nueva empresa';
    this.api.all('identificationtypes').subscribe((identificationTypes) => {
      this.identificationTypes = identificationTypes;
    });
    this.api.all('companies').subscribe((company) => {
      console.log(company);
      this.companies = company;

      this.title = 'Modificar empresa';

      const {
        id,
        name,
        alias,
        identificationTypeId,
        identificationNumber,
        address,
        email,
        phone,
        mobile,
        vat,
        taxes,
        slogan,
        message,
        status,
      } = this.companies[0];

      this.id = id;

      this.form.patchValue({
        name,
        alias,
        identificationTypeId,
        identificationNumber,
        address,
        email,
        phone,
        mobile,
        vat,
        taxes,
        slogan,
        message,
        status,
      });
    });
  }

  ngOnInit(): void {}

  isValid(field: string): boolean {
    const f = this.form.get(field);
    return f.invalid && (f.dirty || f.touched);
  }

  /**
   * Guardar Usuario
   */
  save() {
    if (this.form.valid) {
      this.api.update(`companies/${this.id}`, this.form.value).subscribe(() => {
        alert('Actualizacion exitosa');
      });
    }
  }
}
