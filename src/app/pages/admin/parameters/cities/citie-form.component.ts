import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-citie-form',
  templateUrl: './citie-form.component.html',
  styles: [],
})
export class CitieFormComponent implements OnInit {
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
      dane: ['', Validators.required],
      type: ['', Validators.required],
      cityId: ['', Validators.required],
    });
    this.title = 'Nueva Ciudad';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Ciudad';
      this.id = Number(id);
      const { name, status, dane, type, cityId } = this.storage.read('__city');
      this.form.patchValue({ name, status, dane, type, cityId });
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
        this.api.update(`cities/${this.id}`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/ciudades']);
        });
      } else {
        this.api.create(`cities`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/parametros/ciudades']);
        });
      }
    }
  }
}
