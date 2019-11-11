import { ServiceVoiceManagerService } from './../service-voice-manager.service';
import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
declare var $, jQuery: any;
@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.page.html',
  styleUrls: ['./pop-over.page.scss'],
})
export class PopOverPage implements OnInit {
  id: number;
  text;
  constructor(public navParams: NavParams, public service: ServiceVoiceManagerService,public popOver: PopoverController ) { }

  ngOnInit() {
   this.id = this.navParams.data.paramID;
   this.text = this.navParams.data.text;
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
    console.log('id ', this.id, this.text)
      this.dismissModal()
      setTimeout(()=> {
          $('.titre'+this.id).focus()
      }, 900)
      
  }
  delete() {
     this.service.delete(this.id)
     setTimeout(()=> {
        this.dismissModal()
     }, 1000)
  }
}
