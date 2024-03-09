import { Injectable } from '@angular/core';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItems';
import { products } from 'src/app/shared/models/Products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = new Cart();
  private cartKey = 'cartData';

  constructor() {

    const storedCart = localStorage.getItem(this.cartKey);
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.calculateTotalPrice();
    }
  }

  private saveCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
  }

  private calculateTotalPrice(): void {
    let totalPrice = 0;
    this.cart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });
    this.cart.totalPrice = totalPrice;
  }
  addtoCart(product: products): void {
    let cartItem = this.cart.items.find(item => item.product.id === product.id)
    if (cartItem) {
      this.changeQuantity(product.id, cartItem.quantity + 1)
      return;
    }
    this.cart.items.push(new CartItem(product));
    this.calculateTotalPrice();
    this.saveCart();
  }

  removeFromCart(productid: string): void {
    this.cart.items = this.cart.items.filter(item => item.product.id != productid);
    this.calculateTotalPrice();
    this.saveCart();
  }

  changeQuantity(productid: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.product.id === productid)
    if (!cartItem) return;
    cartItem.quantity = quantity;
    this.calculateTotalPrice();
    this.saveCart();
  }

  getCart(): Cart {
    return this.cart;
  }
  clearCart(): void {
    this.cart = new Cart();
  }
}
