import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Modelo/Producto';
import { ServicioService } from 'src/app/Servicio/servicio.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  producto:Producto = new Producto();

  constructor(private router:Router, private service:ServicioService) { }

  ngOnInit(){
  }

  resultado!: string;

  formularioContacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    precio: new FormControl('', [Validators.required, Validators.minLength(1)]),
    cantidad: new FormControl('', [Validators.required, Validators.minLength(1)]),
    categoria: new FormControl('', [Validators.required, Validators.minLength(1)]),
    color: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  submit() {
    if (this.formularioContacto.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }

  Guardar(){
    this.submit()
    console.log(this.producto.categoriaId)
    if (this.resultado == "Todos los datos son válidos") {
      this.service.createProducto(this.producto)
      .subscribe(data=>{
        alert("Guardado Exitoso...");
        this.router.navigate(["listar"]);
      })
    }else{
      alert("Faltan datos!")
    }

  }

}
