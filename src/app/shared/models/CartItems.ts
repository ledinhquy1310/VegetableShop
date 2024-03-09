import { products } from "./Products"
export class CartItem {
    constructor(products: products) {
        this.product = products

    }
    product: products;
    quantity: number = 1;

    get price(): number {
        return this.product.price * this.quantity
    }

}