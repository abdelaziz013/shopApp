import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../admin-service/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$

  constructor(private producteService:ProductsService) { }

  ngOnInit() {
   this.products$= this.producteService.getProducts()
  }

}
