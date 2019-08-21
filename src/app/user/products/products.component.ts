import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/admin/admin-service/products.service';
import { CategoryService } from 'src/app/admin/admin-service/category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/admin/admin-products/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: { data: Product, id: string }[];
  filterdProducts: { data: Product, id: string }[] = []
  
  category;


  constructor(private productService: ProductsService,
   
    private route: ActivatedRoute

  ) {




  }

  ngOnInit() {

    // get all products
    this.productService.getProducts().pipe(
      switchMap(productData=>{
        this.products =productData
        return this.route.queryParamMap
        })      
    ).subscribe(params=>{
         this.category = params.get('category')    
        this.filterdProducts = (this.category) ? this.products
          .filter(p => p.data.category.toLowerCase().includes(this.category.toLowerCase())) : this.products      

    })
    
    
    // .subscribe(productData => {
    //   this.filterdProducts = this.products = productData
    // });

  
    // filter by category
    // this.route.queryParamMap.subscribe(params => {
    //   this.category = params.get('category')
    //   if (this.products) {
    //     this.filterdProducts = (this.category) ? this.products
    //       .filter(p => p.data.category.toLowerCase().includes(this.category.toLowerCase())) : this.products
    //   }
    // })



  }


}
