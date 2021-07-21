import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ICategory } from './../../../../models/category.model';
import { ApiService } from './../../../../services/api.service';
import { LoadingService } from './../../../../services/loading.service';
import { StorageService } from './../../../../services/storage.service';

import { environment } from '../../../../../environments/environment';
const { server } = environment;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: []
})
export class CategoriesComponent implements OnInit {

  public categories: ICategory[];
  public isLoading: boolean;
  public urlImage = server;
  public category: ICategory;

  constructor(
    private api: ApiService,
    private loading: LoadingService,
    private storage: StorageService,
    private router: Router
  ) {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnInit(): void {
    this.api.all('categories').subscribe(categories => {
      this.categories = categories;
    });
  }

  goToCategory(category: ICategory): void {
    this.storage.save('__category', category);
    this.router.navigate(['/admin/parametros/categoria', category.id]);
  }

  setCategory(category: ICategory): void {
    this.category = category;
  }

  delete(id: number): void {
    this.api.delete(`categories/${id}`).subscribe(() => {
      this.categories.map(item => {
        if (item.id === id) {
          item.status = false;
        }
      });
    });
  }

}
