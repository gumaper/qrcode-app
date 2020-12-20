import { Registro } from './../models/registro.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  registros: Registro[] = [];

  constructor() {}

  salvarRegistro(format: string, text: string) {
    const novoRegistro = new Registro(format, text);
    this.registros.unshift(novoRegistro);
    console.log(this.registros);
  }
}
