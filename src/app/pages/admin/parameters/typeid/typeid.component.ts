import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-typeid',
  templateUrl: './typeid.component.html',
  styles: [],
})
export class TypeidComponent implements OnInit {
  public data: any;
  public identificationtype: any;
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
    this.api.all('identificationtypes').subscribe((identificationtypes) => {
      this.data = identificationtypes;
    });
    this.storage.destroy('__identificationtype');
  }
  setidentificationtype(identificationtype: any): void {
    this.identificationtype = identificationtype;
  }
  goToidentificationtype(identificationtype: any): void {
    this.storage.save('__identificationtype', identificationtype);
    this.router.navigate([
      '/admin/parametros/tipo-identificacion',
      identificationtype.id,
    ]);
  }
  delete(id: number): void {
    this.api.delete(`identificationtypes/${id}`).subscribe((response) => {
      this.data.map((item) => {
        if (item.id === id) {
          item.status = 0;
        }
      });
    });
  }
}
