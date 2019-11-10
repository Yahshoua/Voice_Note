import { ServiceVoiceManagerService } from './../service-voice-manager.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.page.html',
  styleUrls: ['./pop-over.page.scss'],
})
export class PopOverPage implements OnInit {
  id: number;
  constructor(public navParams: NavParams, public service: ServiceVoiceManagerService,public popOver: PopoverController ) { }

  ngOnInit() {
   this.id = this.navParams.data.paramID;
  }
  ionViewWillEnter(){
    
  } 
  dismissModal() {
    this.popOver.dismiss({
      component : PopOverPage,
      'dismissed': true
    });
  }
  rename() {
    this.service.writte(this.id, undefined)
      this.dismissModal()
  }
  delete() {
     this.service.delete(this.id)
     setTimeout(()=> {
        this.dismissModal()
     }, 1000)
  }
}
