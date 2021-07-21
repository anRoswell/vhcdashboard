import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styles: [],
})
export class FeaturesComponent implements OnInit {
  public data: any;
  public feature: any;
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
    this.api.all('features').subscribe((features) => {
      this.data = features;
    });
    this.storage.destroy('__feature');
  }

  setFeature(feature: any): void {
    this.feature = feature;
  }

  goToFeature(feature: any): void {
    this.storage.save('__feature', feature);
    this.router.navigate(['/admin/parametros/caracteristica', feature.id]);
  }

  delete(id: number): void {
    this.api.delete(`features/${id}`).subscribe((response) => {
      this.data.map((item) => {
        if (item.id === id) {
          item.status = 0;
        }
      });
    });
  }
}
