import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../../services/storage.service';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styles: [
  ]
})
export class ProfileFormComponent implements OnInit {

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
      status: [true]
    });

    this.title = 'Nuevo Perfil';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Perfil';
      this.id = Number(id);
      const { name, status } = this.storage.read('__profile');
      this.form.patchValue({ name, status });
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

  ngOnInit(): void {
  }

  isValid(field: string): boolean {
    const f = this.form.get(field);
    return (f.invalid && (f.dirty || f.touched));
  }

  save() {
    if (this.form.valid) {
      if (this.id) {
        this.api.update(`profiles/${this.id}`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/configuraciones/perfiles']);
        });
      } else {
        this.api.create(`profiles`, this.form.value).subscribe(() => {
          this.router.navigate(['/admin/configuraciones/perfiles']);
        });
      }
    }
  }

}
