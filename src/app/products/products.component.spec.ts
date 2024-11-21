import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductService } from '../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [ ReactiveFormsModule, ProductFormComponent, FormsModule, CommonModule , HttpClientModule], 
      providers: [
        ProductService
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadProducts function', () => {
    const fakeData: any[] = [{id: 1, name:"Test Date", price:100, quantity:10 } ]
    const fixture = TestBed.createComponent(ProductsComponent);
    const app = fixture.componentInstance;
    const service = TestBed.inject(ProductService);
    const mySpy = spyOn(service , 'getProducts').and.returnValue(of(fakeData));
    app.loadProducts();
    expect(mySpy).toHaveBeenCalledTimes(1);

  });
});