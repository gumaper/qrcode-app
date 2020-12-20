import { DataLocalService } from './../../services/data-local.service';
import { Component } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };
  constructor(private barcodeScanner: BarcodeScanner, private dataLocalService: DataLocalService) {}

  ionViewWillEnter() {}

  scan() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        if (!barcodeData.cancelled) {
          this.dataLocalService.salvarRegistro(barcodeData.format, barcodeData.text);
        }
      })
      .catch(err => {
        this.dataLocalService.salvarRegistro('QRCode', 'https://google.com.br');
      });
  }
}
