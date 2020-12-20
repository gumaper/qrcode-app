import { Registro } from './../models/registro.model';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  registros: Registro[] = [];

  constructor(private storage: Storage) {
    this.carregarStorage();
  }

  async carregarStorage() {
    this.registros = (await this.storage.get('registros')) || [];
  }

  async salvarRegistro(format: string, text: string) {
    await this.carregarStorage();

    const novoRegistro = new Registro(format, text);
    this.registros.unshift(novoRegistro);
    console.log(this.registros);

    this.storage.set('registros', this.registros);
  }
}
