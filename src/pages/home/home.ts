import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Diagnostic } from '@ionic-native/diagnostic';
import { EscanerProvider } from '../../providers/escaner/escaner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  codigo:string="";
  format:string="";

  //escaneados:any[]=[];


  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,private diagnostic: Diagnostic,private toastCtrl:ToastController, private _es:EscanerProvider) {

  }
  


  abrirCamara(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.codigo=barcodeData.text;
      //this.escaneados.push(barcodeData.text);
      
      this.format=barcodeData.format;

      if (barcodeData.cancelled) {
        this.codigo="Se canceló el Scan";
      }else{
        this._es.agregarProducto(barcodeData.text);
      }

     }).catch(err => {
         console.log('Error', err);
         this.codigo=err;
     });
     
  }

  verificarPermiso(){
    this.diagnostic.isCameraAuthorized().then((authorized) => {
      if(authorized)
          this.abrirCamara()
      else {
          this.diagnostic.requestCameraAuthorization().then((status) => {
              if(status == this.diagnostic.permissionStatus.GRANTED)
                  this.abrirCamara();
              else {
                  // Permissions not granted
                  // Therefore, create and present toast
                  this.toastCtrl.create(
                      {
                          message: "Cannot access camera", 
                          position: "bottom",
                          duration: 5000
                      }
                  ).present();
              }
          });
      }
  });
  }

}
