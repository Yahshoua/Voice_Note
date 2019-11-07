import { ModalHomePage } from './../modal-home/modal-home.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
  constructor(public modalCtrl: ModalController) {}
  async callmodal() {
    const modal = await this.modalCtrl.create({
      component: ModalHomePage,
      cssClass: 'my-custom-modal-css'
    })
    return await modal.present();
  }
}
