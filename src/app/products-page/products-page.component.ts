import { Component, OnInit } from '@angular/core';
import { products } from '../shared/models/Products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { CartService } from '../services/cart/cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  product!: products;
  quantity: number = 1;
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService,
    private productsService: ProductsService, private router: Router, private authService: AuthService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productsService.getById(params['id']).subscribe((product) => {
          this.product = product;
        });
      }
    })
  }
  ngOnInit(): void {
  }

  addtoCart() {
    if (this.authService.isLoggedIn()) {
      if (this.quantity > 0) {
        for (let i = 0; i < this.quantity; i++) {
          this.cartService.addtoCart(this.product);
        }
        this.router.navigateByUrl('/cart-page');
      } else {
        alert("Please select a quantity greater than 0!");
      }
    } else {
      alert("Login to buy this!");
      this.authService.redirectToLogin();
    }
  }

}
