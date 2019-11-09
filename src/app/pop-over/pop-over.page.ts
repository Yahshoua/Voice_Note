import { ServiceVoiceManagerService } from './../service-voice-manager.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.page.html',
  styleUrls: ['./pop-over.page.scss'],
})
export class PopOverPage implements OnInit {

  constructor(public navParams: NavParams, public service: ServiceVoiceManagerService,public popOver: PopoverController ) { }

  ngOnInit() {
   
  }
  dismissModal() {
    this.popOver.dismiss({
      component : PopOverPage,
      'dismissed': true
    });
  }
  delete() {
     let id = this.navParams.data.paramID;
     this.service.delete(id)
     setTimeout(()=> {
        this.dismissModal()
     }, 1000)
  }
}
