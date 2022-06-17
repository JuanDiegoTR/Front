import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServicioService}from '../../Servicio/servicio.service';
import { Producto } from '../../Modelo/Producto';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  productos: Producto[] = [];
  filter: any;

  constructor(private service:ServicioService, private router:Router) { }

  ngOnInit(){
    this.service.getProducto()
      .subscribe(data=>{
        this.productos=data;
      })
    
  }

  Editar(producto:Producto):void{
    localStorage.setItem("id",producto.id!.toString());
    this.router.navigate(["edit"])
  }

  Delete(producto:Producto){
    this.service.deleteProducto(producto)
    .subscribe(data=>{
      this.productos = this.filter((p: Producto)=>p!==producto);
      alert("Producto Eliminado");
      this.router.navigate(["listar"])
      window.location.reload();
      
    })
  }

}
