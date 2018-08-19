//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EscanerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EscanerProvider {

  productos:any[]=[];


  constructor() {
    console.log('Hello EscanerProvider Provider');
  }

  agregarProducto(codigo){
   let producto="prueba";
      this.productos.unshift({codigo:codigo,producto:producto}); 
  }

  eliminarProducto(){

  }

}
