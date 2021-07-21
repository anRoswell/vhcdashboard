import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styles: [
  ]
})
export class MeasuresComponent implements OnInit {
  public data: any;
  public measure: any;
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
    this.api.all('measures').subscribe(measures => {
      this.data = measures;
    });
    this.storage.destroy('__measure');
  }
  setMeasure(measure: any): void {
    this.measure = measure;
  }
  goToMeasure(measure: any): void {
    this.storage.save('__measure', measure);
    this.router.navigate(['/admin/parametros/unidad-medida', measure.id]);
  }
  delete(id: number): void {
    this.api.delete(`measures/${id}`).subscribe(response => {
      this.data.map(item => {
        if (item.id === id) {
          item.status = 0;
        }
      });
    });
  }
}
