import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-taxes',
  templateUrl: './taxes.component.html',
  styles: []
})
export class TaxesComponent implements OnInit {
  public data: any;
  public tax: any;
  public isLoading: boolean;

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router,
    private loading: LoadingService,
    ) {
      this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
     }

    ngOnInit(): void {
      this.api.all('taxes').subscribe(taxes => {
        this.data = taxes;
      });
      this.storage.destroy('__tax');
    }
    setTax(tax: any): void {
      this.tax = tax;
    }
    goToTax(tax: any): void {
      this.storage.save('__tax', tax);
      this.router.navigate(['/admin/parametros/impuesto', tax.id]);
    }
    delete(id: number): void {
      this.api.delete(`taxes/${id}`).subscribe(response => {
        this.data.map(item => {
          if (item.id === id) {
            item.status = 0;
          }
        });
      });
    }

  }
