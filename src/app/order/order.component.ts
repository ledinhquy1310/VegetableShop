import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/Cart';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cart!: Cart;
  userName!: string;
  userPhone!: string;
  address!: string;
  orderSuccess: boolean = false;
  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
      this.userPhone = user.phone;
    }
  }
  Order(): void {
    this.orderSuccess = true
    this.cartService.clearCart();
  }
}
