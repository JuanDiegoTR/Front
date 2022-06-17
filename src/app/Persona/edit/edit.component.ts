import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/Modelo/Producto';
import { ServicioService } from 'src/app/Servicio/servicio.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  producto: Producto = new Producto();

  constructor(private router: Router, private service: ServicioService) { }

  ngOnInit() {
    this.Editar();
  }

  resultado!: string;

  formularioEditar = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    precio: new FormControl('', [Validators.required, Validators.minLength(1)]),
    cantidad: new FormControl('', [Validators.required, Validators.minLength(1)]),
    categoria: new FormControl('', [Validators.required, Validators.minLength(4)]),
    color: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  submit() {
    if (this.formularioEditar.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }


  Editar() {
    let id = localStorage.getItem("id");
    this.service.getProductoId(+id!)
      .subscribe(data => {
        this.producto = data;
      })
  }

  Actualizar(producto: Producto) {
    this.submit()
    if (this.resultado == "Todos los datos son válidos") {
      this.service.updateProducto(producto)
        .subscribe(data => {
          this.producto = data;
          alert("Se actualizo con exito.");
          this.router.navigate(["listar"]);
        })
    }else{
      alert("Faltan datos!")
    }
  }


  Cancelar(){
    this.router.navigate(["listar"]);
  }

}
