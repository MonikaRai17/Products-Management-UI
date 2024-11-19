import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../Models/product.model';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() refreshproduct: EventEmitter<any> = new EventEmitter(); 
  productForm: FormGroup;
  productid: any =0;
  isEditing = false;
  errorMessage ="";
  successMessage ="";
  
  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['0', [ Validators.min(0)]],
      quantity: ['0', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    
  }
  ngOnChanges(){
   if (this.product) {
      this.isEditing = true;
      this.productid = this.product.id;
      this.productForm.patchValue(this.product);
    }
  }

  addProduct() {
    this.productid = 0;
    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;

    this.productService.addProduct(product).subscribe( next => {
      this.refreshproduct.emit();
      this.successMessage = "Product Added Successfully!"

    },
    (error) => {
      this.errorMessage = error.statusText;
    });
    this.alertclose();
    this.resetForm();
    
  }

  

  updateProduct() {

    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;
    product.id = this.productid;
    this.productService.updateProduct(this.productid, product).subscribe( next => {
      this.refreshproduct.emit();
      this.successMessage = "Product Updated Successfully!"
    },
    (error) => {
      this.errorMessage = error.statusText;
    });
    
    this.alertclose();
    this.resetForm();
    
   
  }

  resetForm() {
    this.productid =0;
    this.productForm.reset();
    this.isEditing = false;
    this.errorMessage ="";
    this.successMessage =""
  }

  alertclose()
  {
    setTimeout(() => {
     
      this.errorMessage="";
      this.successMessage="";
    }, 5000);
  }
  
}
