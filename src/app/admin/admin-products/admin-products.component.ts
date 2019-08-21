import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../admin-service/products.service';
import { Subscription } from 'rxjs';
import { Product } from './product';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: { data: Product, id: string }[];  
  Subscription: Subscription;
  tableResource: DataTableResource<{ data: Product, id: string }>
  items: { data: Product, id: string }[] = [];
  itemCount
  limits = [5, 20, 40, 80];


  constructor(private producteService: ProductsService) { }

  ngOnInit() {
    this.Subscription = this.producteService.getProducts().subscribe(productsData => {
       this.products = productsData
      this.intializeTable(productsData)
    })
  }


  // dataTable intializatuion
  private intializeTable(products: { data: Product, id: string }[]) {
    this.tableResource = new DataTableResource(products)
    this.tableResource.query({ offset: 0 }).then(items => {
      this.items = items
    })
    this.tableResource.count().then(count =>
      this.itemCount = count)

  }

  reloadItems(params) {
     if(!this.tableResource) return;
    this.tableResource.query(params).then(items =>this.items = items)
  }

  // filter
  filter(query: any) {
    let fiteredProducts = (query) ? this.products
      .filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())) : this.products

      this.intializeTable(fiteredProducts)
  }

  ngOnDestroy() {
    this.Subscription.unsubscribe()
  }
}
