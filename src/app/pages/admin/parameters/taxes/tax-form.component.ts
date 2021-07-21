import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styles: []
})
export class TaxFormComponent implements OnInit {

  public form: FormGroup;
  public id: number;
  public title: string;
  public isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: StorageService,
    private loading: LoadingService,
    private api: ApiService,
    private router: Router
  ) {

    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);

    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      rate: ['', [
        Validators.required,
        Validators.min(0),
        Validators.max(99)
      ]],
      status: [true]
    });

    this.title = 'Nuevo Impuesto';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Impuesto';
      this.id = Number(id);
      const { name, rate, code, status } = this.storage.read('__tax');
      this.form.patchValue({ name, rate, code, status });
    }
  }

  ngOnInit(): void {
  }
  isValid(field: string): boolean {
    const f = this.form.get(field);
    return (f.invalid && (f.dirty || f.touched));
  }

  save() {
    if (this.form.valid) {
      if (this.id) {
        this.api.update(`taxes/${this.id}`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/impuestos']);
        });
      } else {
        this.api.create(`taxes`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/impuestos']);
        });
      }
    }
  }


}
