import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Modelo/Producto';
import { ServicioService } from 'src/app/Servicio/servicio.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  
  producto:Producto = new Producto();

  productos: Producto[] = [];

  constructor(private router:Router, private service:ServicioService) { }

  ngOnInit(): void {
    
  }

  Todos(){
    this.service.getProducto()
    .subscribe(data=>{
      this.productos=data;
    })
  }

  Electrodomesticos(){
    this.service.getProductosPorCategoria(3)
    .subscribe(data=>{
      this.productos=data;
    })
  }
  
  Mascotas(){
    this.service.getProductosPorCategoria(2)
    .subscribe(data=>{
      this.productos=data;
    })
  }
  
  Hogar(){
    this.service.getProductosPorCategoria(1)
    .subscribe(data=>{
      this.productos=data;
    })
  }

  Compra(){
    this.router.navigate(["compra"]); 
  }

  Selecionar(producto:Producto){
    localStorage.setItem("id",producto.id!.toString());
    this.service.getProductoId(+producto.id!)
    .subscribe(data=>{
      this.producto= data;
      this.router.navigate(["compra"]); 
    })
  }


}
