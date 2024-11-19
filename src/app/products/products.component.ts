// products.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../Models/product.model';
import {ReactiveFormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, ProductFormComponent],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  
  products: Product[] = [];
  errorMessage ="";
  successMessage ="";
  searchQuery : string ="";
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedProduct: Product | null = null;
  
 

  constructor( private productService: ProductService) {
    
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
   
    this.productService.getProducts(this.searchQuery,this.currentPage, this.itemsPerPage).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.statusText;
        
      }
      
    );
    this.alertclose();
  }


  onSearch(query: string): void {
    this.searchQuery = query;
    this.loadProducts();
  }

  editProduct(product: Product){
    this.selectedProduct = product;
     
  }

  clickMethod(id: any, name: any) {
    if(confirm("Are you sure you want to delete "+name)) {
      this.deleteProduct(id);
    }
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(
       (next) => {
        
        this.successMessage = "Product Deleted Successfully!";
        this.loadProducts();
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.statusText;
      }
 
    );
    this.alertclose();
    
  }

  
  alertclose()
  {
    setTimeout(() => {
      this.errorMessage="";
      this.successMessage="";
    }, 5000);
  }
}