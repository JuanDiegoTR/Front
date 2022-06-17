import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from "../Modelo/Producto";
import { Usuario } from '../Modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient) { }

  Url1='http://localhost:8080/api/producto';
  Url2='http://localhost:8080/api/categoria';
  Url3='http://localhost:8080/api/usuario';

  getProducto(){
    return this.http.get<Producto[]>(this.Url1);
  }

  createProducto(producto:Producto){
    return this.http.post<Producto>(this.Url1,producto);
  }

  getProductoId(id:number){
    return this.http.get<Producto>(this.Url1+"/"+id)
  }

  updateProducto(producto:Producto){
    return this.http.put<Producto>(this.Url1+"/"+producto.id,producto);
  }

  deleteProducto(producto:Producto){
    return this.http.delete<Producto>(this.Url1+"/"+producto.id);
  }

  getProductosPorCategoria(id:number){
      return this.http.get<Producto[]>(this.Url2+"/"+id+"/productos")
  }

  createUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.Url3,usuario);
  }

}
