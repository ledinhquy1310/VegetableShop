import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrls: ['./edit-prod.component.css']
})
export class EditProdComponent implements OnInit {
  productId: string = '';
  productForm!: FormGroup;
  selectedImage: File | undefined;
  constructor(private fb: FormBuilder, private productService: ProductsService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.productId = '';
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
    });

    this.getProduct(this.productId);
  }

  getProduct(productId: string) {
    this.productService.getById(productId).subscribe(
      (product: any) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price,
        });
      },
      error => {
        console.error('Error retrieving product:', error);
        alert('Error retrieving product: ' + error.message);
      }
    );
  }
  editProduct() {
    // Truy xuất thông tin ảnh hiện tại của sản phẩm
    this.productService.getById(this.productId).subscribe(
      (product: any) => {
        const currentImage = product.img;

        const productData = {
          id: this.productId,
          name: this.productForm.value.name,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          img: currentImage,
        };

        this.productService.updateProduct(productData).subscribe(
          () => {
            alert('Product details updated successfully!');
            this.route.navigate(['admin']);
          },
          error => {
            console.error('Error updating product:', error);
            alert('Error updating product: ' + error.message);
          }
        );
      },
      error => {
        console.error('Error retrieving product:', error);
        alert('Error retrieving product: ' + error.message);
      }
    );
  }


  isFormValid(): boolean {
    return this.productForm.valid ? true : false;
  }
}
