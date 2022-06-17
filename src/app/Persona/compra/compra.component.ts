import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compra } from 'src/app/Modelo/Compra';
import { Producto } from 'src/app/Modelo/Producto';
import { Usuario } from 'src/app/Modelo/Usuario';
import { ServicioService } from 'src/app/Servicio/servicio.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  compra: Compra = new Compra();

  producto: Producto = new Producto();

  usuario: Usuario = new Usuario();

  constructor(private router: Router, private service: ServicioService) { }

  ngOnInit(): void {
    this.Editar();
  }

  Editar() {
    let id = localStorage.getItem("id");
    this.service.getProductoId(+id!)
      .subscribe(data => {
        this.producto = data;
      })
  }

  resultado!: string;

  formularioCompra = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    identificacion: new FormControl('', [Validators.required, Validators.minLength(8)]),
    direccion: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  submit() {
    if (this.formularioCompra.valid)
      this.resultado = "Todos los datos son válidos";
    else
      this.resultado = "Hay datos inválidos en el formulario";
  }


  Confirmar() {
    this.submit()
    console.log(this.resultado)
    if (this.resultado == "Todos los datos son válidos") {
      this.service.createUsuario(this.usuario)
        .subscribe(data => {
          alert("Guardado Exitoso...");
          this.router.navigate(["venta"])
        })
      localStorage.setItem("cantidad", this.compra.cantidad!.toString());
      localStorage.setItem("precio", this.producto.precio!.toString());
      let cant = localStorage.getItem("cantidad");
      let prec = localStorage.getItem("precio");
      let x = parseInt(cant!);
      let y = parseInt(prec!);
      let z = x * y;
      //Mas que 5 productos y un total menor de 1M
      if (x > 5 && z < 1000000) {
        let descu = (y * 20) / 100;
        let total = y - descu;
        let z = x * total;
        alert("Valor total a pagar: $" + z)
        //El total mayoy a 1M
      } else if (z > 1000000) {
        let desc = (z * 30) / 100;
        let total = z - desc;
        alert("Valor total a pagar: $" + total)
      } else {
        this.router.navigate(["venta"])
      }

    } else {
      alert("Datos o Formulario icompleto")
    }

  }


  Cancelar() {
    this.router.navigate(["venta"])
  }

}
