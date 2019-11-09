import { resolve } from 'url';
import { PopOverPage } from './../pop-over/pop-over.page';
import { ModalRecordComponent } from './../modal-record/modal-record.component';
import { Notes } from './../Model/notes';
import { ServiceVoiceManagerService } from './../service-voice-manager.service';
import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavController, MenuController, PopoverController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { timeout, reject } from 'q';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-page-login',
  templateUrl: 'page-login.page.html',
  styleUrls: ['./page-login.page.scss'],
})
export class PageLoginPage implements OnInit, OnDestroy {
  MesNotes: Notes;
  timerSubscription: Subscription;
  NoteSubscription: Subscription;
  audioList;
  EnableAudio = false;
  norecord = true;
  secondes = '00:00';
  state;
  tomatoe: Promise<string>;
  tomatoes;
  timeSubscription: Subscription;
  timeline;
  constructor(public servicemanager: ServiceVoiceManagerService, private NavCtrl: NavController, public menu: MenuController, public modalCtrl: ModalController, private nativeAudio: NativeAudio, public popoverController: PopoverController) {
  }
 
 

  // async callmodal() {
  //   const modal = await this.modalCtrl.create({
  //     component: ModalRecordComponent,
  //     cssClass: 'my-custom-modal2-css',
  //     backdropDismiss: false
  //   })
  //   this.servicemanager.startRecord()
  //   return await modal.present();
  // }
    recorder() {
      this.servicemanager.startRecord()
    }
    async presentPopover(ev: any) {
      const popover = await this.popoverController.create({
        component: PopOverPage,
        event: ev,
        translucent: true
      });
      return await popover.present();
    }
    transform() {
      if(this.norecord== false) {
        this.stop()
      }
      this.norecord = !this.norecord
      console.log(this.norecord)
    }
    transform1() {
      this.norecord == false ? this.stop(): this.recorder()
      this.norecord = !this.norecord
      console.log(this.norecord)
    }
  stop() {
    setTimeout(()=> {
          this.servicemanager.stopRecord()
    }, 1000)
    
  }
  getTime(temps, etat) {
    if (etat== 'play') {
      return temps
    } else {
        return this.timeline
    }
  }
  ionViewWillEnter() {
    this.servicemanager.reading.subscribe((e: any)=> {
      this.timeline = e
    })
    this.servicemanager.audioList.subscribe((e:any)=> {
        console.log('voici eeeee ', e, e.length)
        if (e.length >= 1) {
          this.audioList = new Promise((resolve, reject)=> {
              this.EnableAudio = true;
              resolve(e)
          })
          console.log('nouvelle valeur de audioList ', this.audioList)
          
        }
    })
    this.servicemanager.tomateSubject.subscribe((e: any)=> {
        this.tomatoe =new Promise((resolve, reject)=> {
            resolve(e)
        })
        console.log('tomatoe ', e)
    })
    this.timeSubscription = this.servicemanager.seconde.subscribe((e: any)=> {
      this.secondes = e;
      if(e == '00:14') {
        setTimeout(()=>{
          this.norecord = !this.norecord
          console.log('no reeeecorrd')
        }, 1000)
      }
   })
  }
  ionViewWillUnload(){
   console.log('unload')
  }
  ionViewWillLeave(){
    console.log('leave')
  }
  playAudio(fileName, i) {
    this.servicemanager.playAudio(fileName, i)
    // this.servicemanager.timer().subscribe(res=>{
    //     console.log(res[0])
    // })
  }
  dismissModal() {
    this.modalCtrl.dismiss({
      component : ModalRecordComponent,
      'dismissed': true
    });
  }
  ngOnInit() {
    this.tomatoes = new Promise<string>((resolve, reject)=> {
      setTimeout(()=> resolve("LOL"), 10000)
  })
    this.NoteSubscription = this.servicemanager.voices.subscribe((e: any)=>{
      this.MesNotes = e;
    })
    this.servicemanager.voicesSubcription()
    console.log(this.MesNotes)
    this.audioList = new Promise((resolve, reject)=> {
      const e = this.servicemanager.getAudioList()
                if (e.length >= 1) {
                    this.EnableAudio = true;
                    this.audioList = e
                    resolve(e)
            }
      })
    
    
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  goToView(id: number) {
    this.NavCtrl.navigateForward('/get-voice', {queryParams: {index: id} } )
  }
  ngOnDestroy() {
    this.NoteSubscription.unsubscribe()
  }
}