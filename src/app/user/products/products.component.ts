import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/admin/admin-service/products.service';
import { CategoryService } from 'src/app/admin/admin-service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/admin/admin-products/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: { data: Product, id: string }[];
  filterdProducts: { data: Product, id: string }[] = []
  category;
  cart:any;
  cartSubscription: Subscription;



  constructor(private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService


  ) {

    // get all products
    this.productService.getProducts().pipe(
      switchMap(productData => {
        this.products = productData
        return this.route.queryParamMap
      })
    ).subscribe(params => {
      this.category = params.get('category')
      this.filterdProducts = (this.category) ? this.products
        .filter(p => p.data.category.toLowerCase().includes(this.category.toLowerCase())) : this.products
    })


  }

  ngOnInit() {


  }





}
