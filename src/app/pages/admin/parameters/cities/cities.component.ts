import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styles: [],
})
export class CitiesComponent implements OnInit {
  public data: any;
  public city: any;
  public isLoading: boolean;
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router,
    private loading: LoadingService
  ) {
    this.loading.isLoading.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
  }

  ngOnInit(): void {
    this.api.all('cities').subscribe((cities) => {
      this.data = cities;
    });
    this.storage.destroy('__city');
  }
  setcity(city: any): void {
    this.city = city;
  }
  goTocity(city: any): void {
    this.storage.save('__city', city);
    this.router.navigate(['/admin/parametros/ciudad', city.id]);
  }
  delete(id: number): void {
    this.api.delete(`cities/${id}`).subscribe((response) => {
      this.data.map((item) => {
        if (item.id === id) {
          item.status = 0;
        }
      });
    });
  }
}
