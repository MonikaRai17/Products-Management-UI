import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;

  /**
   * Using sample data to check implementation of CRUD methods 
   */
  const mockData = [
    {
      "id": 1,
      "name": "Mouse",
      "price": 250,
      "quantity": 100
    },
    {
      "id": 2,
      "name": "Keyboard",
      "price": 1200,
      "quantity": 100
    }
  ];

  afterEach(() => {
    httpTestingController.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ProductService, { provide: 'url', useValue:'apiUrl' }]

    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll should make a GET HTTP request and return all data items', () => {
    var searchQuery ="", page = 1, limit = 10;
    service.getProducts(searchQuery, page, limit).subscribe(res => {
      expect(res).toEqual(mockData); 
      expect(res.length).toBe(2); 
     }); 
    const req = httpTestingController.expectOne('apiUrl');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
   });

   it('getById should make a GET HTTP request with id appended to end of url', () => {
    service.getaProduct(1).subscribe(res => {
      expect(res).toEqual(mockData); 
     }); 
    const req = httpTestingController.expectOne('apiUrl/1');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(mockData);
    httpTestingController.verify();
   });

   it('delete should make a DELETE HTTP request with id appended to end of url', () => {
    service.deleteProduct(1).subscribe(res => {
      expect(res).toBe(1); 
     }); 
    const req = httpTestingController.expectOne('apiUrl/1', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpTestingController.verify();
   });

   it('update should make a POST HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = {id:1, name: "updatedName", price:1, quantity:1 };
    service.updateProduct(1, updateObj).subscribe(res => {
      expect(res.name).toBe('updatedName'); 
     }); 
    const req = httpTestingController.expectOne('apiUrl/1', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpTestingController.verify();
   });

   it('create should make a POST HTTP request with resource as body', () => {
    const createObj = {id:1, name: "mock data", price:10, quantity:10 };
    service.addProduct(createObj).subscribe(res => {
      expect(res.name).toBe('mock data'); 
     }); 
    const req = httpTestingController.expectOne('apiUrl', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy(); 
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpTestingController.verify();
    });
   });

