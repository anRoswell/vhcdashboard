import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';


@Component({
  selector: 'app-packing-form',
  templateUrl: './packing-form.component.html',
  styles: [
  ]
})
export class PackingFormComponent implements OnInit {
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
    this.title = 'Nuevo Empaque';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar el Empaque';
      this.id = Number(id);
      const { name, code, status } = this.storage.read('__packing');
      this.form.patchValue({ name, code, status });
    }
    /*
    this.route.params.subscribe(({ id }) => {
      console.log('ID: ', id);
      this.id = id;
      if (id) {
        const { name, status } = this.storage.read('__packing');
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
        this.api.update(`packing/${this.id}`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/unidades-empaque']);
        });
      } else {
        this.api.create(`packing`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/unidades-empaque']);
        });
      }
    }
  }

}

