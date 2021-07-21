import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styles: []
})
export class PackingComponent implements OnInit {
  public data: any;
  public packing: any;
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
    this.api.all('packing').subscribe(packing => {
      this.data = packing;
    });
    this.storage.destroy('__packing');
  }
  setPacking(packing: any): void {
    this.packing = packing;
  }
  goToPacking(packing: any): void {
    this.storage.save('__packing', packing);
    this.router.navigate(['/admin/parametros/empaque', packing.id]);
  }
  delete(id: number): void {
    this.api.delete(`packing/${id}`).subscribe(response => {
      this.data.map(item => {
        if (item.id === id) {
          item.status = 0;
        }
      });
    });
  }


}
