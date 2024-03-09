import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { products } from '../shared/models/Products';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productDetail: products | undefined;
  products: products[] = [];
  constructor(private productsService: ProductsService, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.productsService.getAll().subscribe((data: products[]) => {
          this.products = data.filter(product =>
            product.name.toLowerCase().includes(params['searchTerm'].toLowerCase())
          );
        });
      }
      else {
        this.productsService.getAll().subscribe((data: products[]) => {
          this.products = data;
        });
      }
    })
  }
  showRating(str: any) {
    alert(`${str}`);
  }
}
