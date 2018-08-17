import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Diagnostic } from '@ionic-native/diagnostic';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  codigo:string="";
  format:string="";

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner,private diagnostic: Diagnostic,private toastCtrl:ToastController) {

  }


  abrirCamara(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.codigo=barcodeData.text;
      this.format=barcodeData.format;

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
