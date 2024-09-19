import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from '../product.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProductModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortProperty: string = 'name';
  sortOrder=1;

  ngOnInit(): void {
    this.productService.fetchAllProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    })
  }

    delete(id: number) {
      const isConfirmed = window.confirm("Are you sure you want to delete this product?");
      if (isConfirmed) {
        this.productService.deleteProduct(id).subscribe((data) => {
          this.products = this.products.filter(product => product.id !== id);
        });
        window.location.reload();
      }
    }

    filterProducts(input : String){
        this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(input.toLowerCase())
        || product.name.toLowerCase().includes(input.toLowerCase())
        || product.name.toLowerCase().includes(input.toLowerCase()));
      console.log(this.filteredProducts);
    }



    sortBy(value: string) {
      this.sortOrder = value === this.sortProperty ? (this.sortOrder * -1) : 1;
      this.sortProperty = value;
      this.filteredProducts = [...this.products.sort((a: any, b: any) => {
        let result = 0;
        if (a[value] < b[value]) {
          result = -1;
        }
        if (a[value] > b[value]) {
          result = 1;
        }
        return result * this.sortOrder;
      })];
    }



}
