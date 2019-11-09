import { Record } from './Model/record';
import { User } from './Model/user-model';
import { Notes } from './Model/notes';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { forkJoin } from 'rxjs';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class ServiceVoiceManagerService {
  constructor(public http: HttpClient, public media: Media, public file: File) { }
  private temps;
  private secondes = 1;
  private interval = 1000;
  tomate;
  url = 'http://localhost/php-app/setUser.php';
  url2 = 'http://localhost/php-app/getUser.php';
  header = new HttpHeaders({'Content-Type': 'application/json'})
  private VoiceObjt: Notes[] = [
    {
      id: 0,
      author: '',
      type: 'text',
      content:  "<b style='font-family: 'RobotoCondensed-Bold''>Bienvenu sur la version Android de NoteVoice !</b><br> <p style='font-family: 'UbuntuMono-Regular'>Ouvrez ceci pour obtenir des instructions. Pour créer une note vocale, appuyez sur le bouton orange...</p>",
      createdAt: '30 Octobre 2019',
      modifiedAt: '',
      folder: '',
      tag: [],
      description: ''
    }
  ]
  private record: Record = 
    {
    recording: false,
    filePath:'',
    fileName: '',
    audioList: []
    }
  timers
  timer():Observable<any> {
    return this.timers;
  }
  delete(id) {
      let notes = JSON.parse(localStorage.getItem("audiolist")) || []
      console.log('note de depart ', notes, ' id a supprimer ', id)
      notes = notes.slice(id, 1)
      console.log('audiolist ', notes)
      // notes = localStorage.setItem("audiolist", JSON.stringify(notes));
      // this.record.audioList = notes
      // this.audioListSubscribtion()
  }
  audio: MediaObject;
  voices = new Subject();
  Record = new Subject();
  audioList = new Subject();
  duration = new Subject();
  seconde = new Subject();
  reading = new Subject();
  read;
  t;
  timeline: boolean;
  y;
  timeLineSubject = new Subject();
  tomateSubject = new Subject();
  audioListSubscribtion() {
    this.audioList.next(this.record.audioList)
  }

  timeLineSubscription() {
    this.timeLineSubject.next(this.timeline)
  }
  readingSubscribtion() {
    this.reading.next(this.read)
  }

  tomateSubscription() {
    this.tomateSubject.next(this.tomate)
  }
  secondeSubscrition() {
    this.seconde.next(this.temps)
  }
  recording() {
    this.t = setInterval(()=> {
       let s = this.secondes++
       if( s < 10) {
          this.temps = '00:0'+s
       } else if (s >= 10) {
         this.temps = '00:'+s
       } 
       if (s == 15) {
         this.secondes = 0
         this.clearRecord()
       }
        this.secondeSubscrition()
      }, this.interval)
  }

  clearRecord() {
    this.temps = '00:00'
    clearTimeout(this.t)
    this.secondes = 0
    this.secondeSubscrition()
    this.audio.stopRecord();
    this.record.recording = false;
  }
  clearRecord2() {
    this.temps = '00:00'
    clearTimeout(this.t)
    this.secondes = 0
    this.secondeSubscrition()
  }
  durationSubscriber() {
    this.duration.next(this.timer)
  }
  voicesSubcription() {
    this.voices.next(this.VoiceObjt);
  }
  RecordSubscription() {
    this.Record.next(this.record);
  }
  //requete de creation d'un nouvel user
  setUser(userObj: User) {
    const req = new Promise((resolve, reject)=> {
      this.http.post(this.url, userObj, {headers: this.header})
      .toPromise()
      .then(res => {
          resolve(res)
      })
    })
    return req;
  }
  //fin
   //requete de recuperation  d'user
   getUser(userObj: User) {
    const req = new Promise((resolve, reject)=> {
      this.http.post(this.url2, userObj, {headers: this.header})
      .toPromise()
      .then(res => {
          resolve(res)
      })
    })
    return req;
  }
  //fin
    getAudioList() {
    if(localStorage.getItem("audiolist")) {
      this.RecordSubscription()
        this.record.audioList = JSON.parse(localStorage.getItem("audiolist"));
        this.audioListSubscribtion()
        return  this.record.audioList
    } else {
      return []
    }
  }
  startRecord() {
    this.RecordSubscription()
    this.record.fileName = 'voix'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
    this.record.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.record.fileName;
    this.audio = this.media.create(this.record.filePath);
    this.audio.startRecord();
    this.record.recording = true;
    this.recording()
  }
  stopRecord() {
    this.timeline = false
    this.RecordSubscription()
    this.audio.stopRecord();
    let index = JSON.parse(localStorage.getItem("audiolist")) || []
    this.record.recording = false;
    this.clearRecord2()
    this.audio = this.media.create(this.record.filePath);
    this.audio.play()
    this.audio.setVolume(0);
    this.retrieveDuration().then((res: any)=> {
      this.audio.stop()
      res = Math.floor(res)
      const timing = res
      if( res < 10) {
        res = '00:0'+res
     } else if (res >= 10) {
       res = '00:'+res
     }
     let title = 'voix'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()
      let data = {id: index.length, filename: this.record.fileName, etat: 'play',state:'play', temps: res, titre: title, timing: timing};
      this.record.audioList.push(data);
      localStorage.setItem("audiolist", JSON.stringify(this.record.audioList));
      this.getAudioList();
    })
    // fin
  }

   retrieveDuration(){
    return new Promise((resolve, reject)=> {
      setTimeout(()=> {
        resolve(this.audio._objectInstance._duration)
      }, 1000)
          
    })
  }
  clearRead() {
    clearTimeout(this.y)
  }
   playAudio(file, i) {
    this.read = this.record.audioList[i].temps
    this.readingSubscribtion()
     if(this.y) {
       
       this.clearRead()
     }
    console.log('valeur de y ', this.y)
    this.read = this.record.audioList[i].temps
     this.timeline = true
      i = parseInt(i)
      let p = i
      if(this.audio) {
         this.audio.stop();
      }
      console.log('je suis i ', i)
      
      this.record.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.record.filePath);
      this.audio.play()
      this.audio.setVolume(0.8);
      if (this.record.audioList[i].state =='square') {
      this.record.audioList[i].state = 'play'
         this.audio.stop();
      } else {
       this.record.audioList[i].state = 'square'
      }
    let decount = this.record.audioList[i].timing
    let count = 0
      this.y =  setInterval(()=> {
          decount--
          count++
          console.log('reading ', decount)
          if( decount < 10) {
            this.read = '00:0'+decount
         } else if (decount >= 10) {
            this.read = '00:'+decount
         }
         if( decount == 0) {
          // this.read = this.record.audioList[i].temps
         }
         console.log('lecture...', this.read)
          if(count == this.record.audioList[i].timing) {
              console.log('stop')
              count = 0
              this.clearRead()
          }
          this.readingSubscribtion()
      }, 1000)
     
      setTimeout(()=> {
        console.log('voici i ', i , this.record.audioList[i])
        this.record.audioList[i].state = 'play'
        this.audioListSubscribtion()
       
      }, this.record.audioList[i].timing*1000)
      for(let j=0; j<this.record.audioList.length;j++) {
        if(j !== p) {
          this.record.audioList[j].state = "play"
        }
      }
      this.retrieveDuration().then((e)=>{
        console.log('temps ', e)
      })
  }

}
