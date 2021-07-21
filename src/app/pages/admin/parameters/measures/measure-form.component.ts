import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-measure-form',
  templateUrl: './measure-form.component.html',
  styles: []
})
export class MeasureFormComponent implements OnInit {
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
        code: ['', Validators.required],
        status: [true]
      });
      this.title = 'Nueva Unidad de Medida';
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.title = 'Modificar la Unidad de Medida';
        this.id = Number(id);
        const { name, code, status } = this.storage.read('__measure');
        this.form.patchValue({ name, code, status });
      }
      /*
      this.route.params.subscribe(({ id }) => {
        console.log('ID: ', id);
        this.id = id;
        if (id) {
          const { name, status } = this.storage.read('__measure');
          this.form.patchValue({ name, code, status });
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
          this.api.update(`measures/${this.id}`, this.form.value).subscribe(() => {
            this.router.navigate(['/admin/parametros/unidades-medida']);
          });
        } else {
          this.api.create(`measures`, this.form.value).subscribe(() => {
            this.router.navigate(['/admin/parametros/unidades-medida']);
          });
        }
      }
    }

  }
