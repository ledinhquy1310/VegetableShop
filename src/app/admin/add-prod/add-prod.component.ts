import { Component } from '@angular/core';
import { products } from 'src/app/shared/models/Products';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-prod',
  templateUrl: './add-prod.component.html',
  styleUrls: ['./add-prod.component.css']
})
export class AddProdComponent {
  product: products = {
    id: '',
    name: '',
    description: '',
    price: 0,
    img: ''
  };
  selectedImage: File | undefined;
  constructor(private productService: ProductsService, private route: Router) { }

  handleImageInput(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedImage = fileList[0];
      // Lấy đường dẫn của ảnh
      const reader = new FileReader();
      reader.onload = () => {
        this.product.img = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  addProduct() {
    this.product.id = this.generateId();
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', String(this.product.price));
    formData.append('image', this.selectedImage!);

    this.productService.addProduct(this.product).subscribe(
      (newProduct: products) => {
        alert('Product added successfully!');
        this.route.navigate(["admin"])
      },
      error => {
        alert('Error adding product: ' + error);
      }
    );
  }
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  isFormValid(): boolean {
    if (!this.product.name || !this.product.description || !this.product.price || !this.selectedImage) {
      return false;
    }
    return true;
  }
}
