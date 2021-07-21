import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-typeid-form',
  templateUrl: './typeid-form.component.html',
  styles: [],
})
export class TypeidFormComponent implements OnInit {
  public form: FormGroup;
  public id: number;
  public title: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: StorageService,
    private api: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      status: [true],
      code: ['', Validators.required],
    });

    this.title = 'Nuevo Tipo Identificación';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Tipo Identificación';
      this.id = Number(id);
      const { name, status, code } = this.storage.read('__identificationtype');
      this.form.patchValue({ name, status, code });
    }
    /*
    this.route.params.subscribe(({ id }) => {
      console.log('ID: ', id);
      this.id = id;
      if (id) {
        const { name, status } = this.storage.read('__profile');
        this.form.patchValue({ name, status });
      }
    });
    */
  }

  ngOnInit(): void {}

  isValid(field: string): boolean {
    const f = this.form.get(field);
    return f.invalid && (f.dirty || f.touched);
  }

  save() {
    if (this.form.valid) {
      if (this.id) {
        this.api
          .update(`identificationtypes/${this.id}`, this.form.value)
          .subscribe(() => {
            this.router.navigate(['/admin/parametros/tipos-identificacion']);
          });
      } else {
        this.api
          .create(`identificationtypes`, this.form.value)
          .subscribe(() => {
            this.router.navigate(['/admin/parametros/tipos-identificacion']);
          });
      }
    }
  }
}
