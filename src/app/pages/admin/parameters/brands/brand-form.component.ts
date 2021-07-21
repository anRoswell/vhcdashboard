import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styles: []
})
export class BrandFormComponent implements OnInit {

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
      status: [true]
    });

    this.title = 'Nueva Marca';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Marca';
      this.id = Number(id);
      const { name, status } = this.storage.read('__brand');
      this.form.patchValue({ name, status });
    }
    /*
    this.route.params.subscribe(({ id }) => {
      console.log('ID: ', id);
      this.id = id;
      if (id) {
        const { name, status } = this.storage.read('__brand');
        this.form.patchValue({ name, status });
      }
    });
    */
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
        this.api.update(`brands/${this.id}`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/marcas']);
        });
      } else {
        this.api.create(`brands`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/marcas']);
        });
      }
    }
  }


}
