import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../../../guards/auth.guard';

import { AdminComponent } from '../admin.component';

import { CitiesComponent } from './cities/cities.component';
import { CitieFormComponent } from './cities/citie-form.component';
import { TypeidComponent } from './typeid/typeid.component';
import { TypeidFormComponent } from './typeid/typeid-form.component';
import { BrandsComponent } from './brands/brands.component';
import { BrandFormComponent } from './brands/brand-form.component';
import { MeasuresComponent } from './measures/measures.component';
import { MeasureFormComponent } from './measures/measure-form.component';
import { PackingComponent } from './packing/packing.component';
import { PackingFormComponent } from './packing/packing-form.component';
import { TaxesComponent } from './taxes/taxes.component';
import { TaxFormComponent } from './taxes/tax-form.component';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './categories/category-form.component';
import { FeaturesComponent } from './features/features.component';
import { FeatureFormComponent } from './features/feature-form.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/product-form.component';


const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      { path: 'parametros/ciudades', component: CitiesComponent },
      { path: 'parametros/ciudad', component: CitieFormComponent },
      { path: 'parametros/ciudad/:id', component: CitieFormComponent },
      { path: 'parametros/tipos-identificacion', component: TypeidComponent },
      {
        path: 'parametros/tipo-identificacion',
        component: TypeidFormComponent,
      },
      {
        path: 'parametros/tipo-identificacion/:id',
        component: TypeidFormComponent,
      },
      { path: 'parametros/categorias', component: CategoriesComponent },
      { path: 'parametros/categoria', component: CategoryFormComponent },
      { path: 'parametros/categoria/:id', component: CategoryFormComponent },
      { path: 'parametros/marcas', component: BrandsComponent },
      { path: 'parametros/marca', component: BrandFormComponent },
      { path: 'parametros/marca/:id', component: BrandFormComponent },
      { path: 'parametros/unidades-medida', component: MeasuresComponent },
      { path: 'parametros/unidad-medida', component: MeasureFormComponent },
      { path: 'parametros/unidad-medida/:id', component: MeasureFormComponent },
      { path: 'parametros/unidades-empaque', component: PackingComponent },
      { path: 'parametros/empaque', component: PackingFormComponent },
      { path: 'parametros/empaque/:id', component: PackingFormComponent },
      { path: 'parametros/caracteristicas', component: FeaturesComponent },
      { path: 'parametros/caracteristica', component: FeatureFormComponent },
      {
        path: 'parametros/caracteristica/:id',
        component: FeatureFormComponent,
      },
      { path: 'parametros/impuestos', component: TaxesComponent },
      { path: 'parametros/impuesto', component: TaxFormComponent },
      { path: 'parametros/impuesto/:id', component: TaxFormComponent },
      { path: 'parametros/productos', component: ProductsComponent },
      { path: 'parametros/producto', component: ProductFormComponent },
      { path: 'parametros/producto/:id', component: TaxFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersRoutingModule {}
