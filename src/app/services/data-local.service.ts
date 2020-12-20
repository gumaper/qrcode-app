import { Registro } from './../models/registro.model';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  registros: Registro[] = [];

  constructor(private storage: Storage, private navController: NavController, private iab: InAppBrowser) {
    this.carregarStorage();
  }

  async carregarStorage() {
    this.registros = (await this.storage.get('registros')) || [];
  }

  async salvarRegistro(format: string, text: string) {
    await this.carregarStorage();

    const novoRegistro = new Registro(format, text);
    this.registros.unshift(novoRegistro);

    this.storage.set('registros', this.registros);

    this.navController.navigateForward('/tabs/tab2');
  }

  abrirRegistro(registro: Registro) {
    this.navController.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        this.iab.create(registro.text, '_system');
        break;

      default:
        break;
    }
  }
}
