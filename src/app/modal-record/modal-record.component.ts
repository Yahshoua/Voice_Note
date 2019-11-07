import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceVoiceManagerService } from './../service-voice-manager.service';
@Component({
  selector: 'app-modal-record',
  templateUrl: './modal-record.component.html',
  styleUrls: ['./modal-record.component.scss'],
})
export class ModalRecordComponent implements OnInit, OnDestroy {
  constructor(public modalCtrl: ModalController, public service: ServiceVoiceManagerService) { }
  secondes = '00:00';
  timeSubscription: Subscription;
  dismissModal() {
    this.modalCtrl.dismiss({
      component : ModalRecordComponent,
      'dismissed': true
    });
  }
  stop() {
    this.service.stopRecord()
    setTimeout(()=>{
      this.dismissModal()
    }, 1000)
  }
  ngOnInit() {
    this.timeSubscription = this.service.seconde.subscribe((e: any)=> {
      this.secondes = e;
      if(e == '00:15') {
        setTimeout(()=>{
          this.dismissModal()
        }, 1000)
      }
   })
  }
  ngOnDestroy() {
    this.timeSubscription.unsubscribe()
  }
}
