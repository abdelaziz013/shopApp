import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/admin/admin-service/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input() category
  constructor( private categoryService: CategoryService,) { }

  ngOnInit() {
      // get categories
      this.categories$ = this.categoryService.getCategories();

  }

}
