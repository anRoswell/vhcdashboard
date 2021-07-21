import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StorageService } from './../../../../services/storage.service';
import { ApiService } from './../../../../services/api.service';

import { environment } from '../../../../../environments/environment';
const { server } = environment;

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styles: []
})
export class CategoryFormComponent implements OnInit {

  public urlImage = server;
  public form: FormGroup;
  public id: number;
  public title: string;
  public isLoading: boolean;
  public categoryImage: File;
  public errorImage: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: StorageService,
    private api: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      description: ['', Validators.required],
      seo: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        keywords: ['', Validators.required],
      }),
      imageUrl: [''],
      status: [true]
    });

    this.title = 'Nueva Categoría';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Categoría';
      this.id = Number(id);
      const category = this.storage.read('__category');
      this.form.patchValue({ ...category });
    }
  }

  ngOnInit(): void {}

  isValid(field: string): boolean {
    const f = this.form.get(field);
    return (f.invalid && (f.dirty || f.touched));
  }

  inputFile({ target }) {
    this.categoryImage = target.files[0];
    this.errorImage = !(this.categoryImage) ? true : false;
  }

  save() {
    if (!this.id && !this.categoryImage) {
      this.errorImage = true;
    } else if (this.form.valid) {
      this.errorImage = false;
      const { name, slug, description, seo, imageUrl, status } = this.form.value;
      const form = new FormData();
      form.append('name', name);
      form.append('slug', slug);
      form.append('description', description);
      form.append('seo', JSON.stringify(seo));
      if (this.categoryImage) {
        form.append('imageUrl', this.categoryImage);
      } else {
        form.append('imageUrl', imageUrl);
      }
      form.append('status', (status) ? '1' : '0');

      if (this.id) {
        this.api.update(`categories/${this.id}`, form).subscribe(() => {
          this.router.navigate(['/admin/parametros/categorias']);
        });
      } else {
        this.api.create(`categories`, form).subscribe(() => {
          this.router.navigate(['/admin/parametros/categorias']);
        });
      }
    }
  }

}
