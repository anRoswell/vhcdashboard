import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-feature-form',
  templateUrl: './feature-form.component.html',
  styles: [],
})
export class FeatureFormComponent implements OnInit {
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
      values: this.fb.array([]),
      status: [true],
    });

    this.title = 'Nueva Caracteristica';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Caracteristica';
      this.id = Number(id);
      const { name, values, status } = this.storage.read('__feature');
      this.form.patchValue({ name, status });
      values.forEach((v: string) => this.values.push(this.fb.control(v)));
    }
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
          .update(`features/${this.id}`, this.form.value)
          .subscribe(() => {
            this.router.navigate(['/admin/parametros/caracteristicas']);
          });
      } else {
        this.api.create(`features`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/caracteristicas']);
        });
      }
    }
  }

  /*############### Add Dynamic Elements ###############*/
  get values() {
    return this.form.get('values') as FormArray;
  }

  set values(v: any) {
    this.values.push(v);
  }

  addItem() {
    this.values.push(this.fb.control('', Validators.required));
  }

  deleteNameField(index: number) {
    if (this.values.length !== 0) {
      this.values.removeAt(index);
    }
    console.log(this.values.length);
  }
}
