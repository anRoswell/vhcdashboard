import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { ApiService } from './../../../../services/api.service';
import { StorageService } from './../../../../services/storage.service';
import { LoadingService } from './../../../../services/loading.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductFormComponent implements OnInit {

  public form: FormGroup;
  public id: number;
  public title: string;
  public isLoading: boolean;
  public Editor = ClassicEditor;

  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings: any = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storage: StorageService,
    private loading: LoadingService,
    private api: ApiService,
    private router: Router
  ) {
    this.loading.isLoading.subscribe(isLoading => this.isLoading = isLoading);
    this.form = this.fb.group({
      name: ['', Validators.required],
      slug: ['', Validators.required],
      code: [''],
      excerpt: ['', Validators.required],
      description: ['', Validators.required],
      brandId: [''],
      measureId: ['', Validators.required],
      packingId: ['', Validators.required],
      taxId: ['', Validators.required],
      minStock: [0, Validators.min(0)],
      maxStock: [0, Validators.min(0)],
      balance: [0, Validators.min(0)],
      cost: [0, Validators.min(0)],
      price: [0, Validators.min(0)],
      sale: [0, Validators.min(0)],
      categories: ['', Validators.required],

      onSale: [false],
      status: [true]
    });

    this.title = 'Nuevo Producto';
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Modificar Producto';
      this.id = Number(id);
      const { name, status } = this.storage.read('__product');
      this.form.patchValue({ name, status });
    }
  }

  ngOnInit(): void {
    this.dropdownList = [
      { id: 1, name: 'Mumbai' },
      { id: 2, name: 'Bangaluru' },
      { id: 3, name: 'Pune' },
      { id: 4, name: 'Navsari' },
      { id: 5, name: 'New Delhi' }
    ];

    this.dropdownSettings = {
      defaultOpen: false,
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Limpiar selección',
      searchPlaceholderText: 'Buscar',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  isInvalid(field: string): boolean {
    const f = this.form.get(field);
    return (f.invalid && (f.dirty || f.touched));
  }

  save() {

  }

}
