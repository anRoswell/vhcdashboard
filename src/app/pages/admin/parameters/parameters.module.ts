import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { BrandsComponent } from './brands/brands.component';
import { BrandFormComponent } from './brands/brand-form.component';
import { MeasureFormComponent } from './measures/measure-form.component';
import { MeasuresComponent } from './measures/measures.component';
import { PackingComponent } from './packing/packing.component';
import { PackingFormComponent } from './packing/packing-form.component';
import { CitiesComponent } from './cities/cities.component';
import { CitieFormComponent } from './cities/citie-form.component';
import { TypeidComponent } from './typeid/typeid.component';
import { TypeidFormComponent } from './typeid/typeid-form.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './categories/category-form.component';
import { FeaturesComponent } from './features/features.component';
import { FeatureFormComponent } from './features/feature-form.component';
import { TaxFormComponent } from './taxes/tax-form.component';
import { TaxesComponent } from './taxes/taxes.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form.component';

@NgModule({
  declarations: [
    BrandsComponent,
    BrandFormComponent,
    MeasureFormComponent,
    MeasuresComponent,
    PackingComponent,
    PackingFormComponent,
    CitiesComponent,
    CitieFormComponent,
    TypeidComponent,
    TypeidFormComponent,
    CategoriesComponent,
    CategoryFormComponent,
    FeaturesComponent,
    FeatureFormComponent,
    TaxFormComponent,
    TaxesComponent,
    ProductsComponent,
    ProductFormComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
  ]
})
export class ParametersModule { }
