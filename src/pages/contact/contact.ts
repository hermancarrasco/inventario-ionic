import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EscanerProvider } from '../../providers/escaner/escaner';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  prod:any;

  constructor(public navCtrl: NavController, private _es:EscanerProvider) {

  }

  ionViewDidLoad(){
    this.prod=this._es.productos;
  }


}
