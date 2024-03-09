import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
import { products } from 'src/app/shared/models/Products';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-products-db',
  templateUrl: './products-db.component.html',
  styleUrls: ['./products-db.component.css']
})
export class ProductsDbComponent implements OnInit {
  products: products[] = [];

  constructor(private productService: ProductsService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getProducts();
    if (!this.authService.isAdmin()) {
      alert('Bạn không đủ quyền hạn để truy cập trang admin');
      this.router.navigate(['']);
    }
  }
  getProducts() {
    this.productService.getAll().subscribe(
      (data: products[]) => {
        this.products = data;
      },
      error => {
        console.error('Error getting products:', error);
      }
    );
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        alert('Product deleted successfully!');
        this.getProducts();
      },
      error => {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + error.message);
      }
    );
  }

  editProduct(productId: string) {
    this.router.navigate(['/edit', productId]);
  }
}
