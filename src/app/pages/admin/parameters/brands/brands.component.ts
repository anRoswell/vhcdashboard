import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styles: []
})
export class BrandsComponent implements OnInit {
  public data: any;
  public brand: any;
  public isLoading: boolean;

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router,
    private loading: LoadingService
    ) {
      this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
     }

    ngOnInit(): void {
      this.api.all('brands').subscribe(brands => {
        this.data = brands;
      });
      this.storage.destroy('__brand');
    }
    setBrand(brand: any): void {
      this.brand = brand;
    }
    goToBrand(brand: any): void {
      this.storage.save('__brand', brand);
      this.router.navigate(['/admin/parametros/marca', brand.id]);
    }
    delete(id: number): void {
      this.api.delete(`brands/${id}`).subscribe(response => {
        this.data.map(item => {
          if (item.id === id) {
            item.status = 0;
          }
        });
      });
    }


  }
