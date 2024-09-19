import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  Product: Product={
    id:0,
    name:"",
    type:"",
    brand:""
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = Number(params.get('id'));
      this.getById(id);

    })
  }

  getById(id: number) {
    this.productService.getById(id).subscribe((data) => {
      this.Product = data;
    })
  }

  cancel(){
    this.router.navigate(["product/home"])
  }

  update(){
    this.productService.updateProduct(this.Product).subscribe({
      next:(data)=>{
        this.router.navigate(["product/home"])
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  
     
  }

