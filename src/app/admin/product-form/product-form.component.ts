import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../admin-service/category.service';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../admin-service/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../admin-products/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public categories$;
  public mode;
  public id;
  public product
  
  

  constructor(public categoryService: CategoryService,
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.mode = 'edit'
        this.id = paramMap.get('id')
      }
    })

    this.categories$ = this.categoryService.getCategories()
    this.productService.getProductById(this.id).pipe(
      take(1)
    )
      .subscribe(p => this.product = p)


  }

  save(formValue: NgForm) {
    if (this.mode === 'edit') {
      return this.productService.updateProductById(this.id, formValue.value).then(savedProduct => {
        this.router.navigate(['admin/products'])
      })
    }

    this.productService.addProducet(formValue.value).then(savedProduct => {
      this.router.navigate(['admin/products'])
    })
  }

  delete() {
    if (!confirm('Are You Sure You Want to delete This product?'))  return;
      this.productService.deleteProductById(this.id)
      // this.router.navigate(['admin/products'])
    }
}
