import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalHomePage } from './../modal-home/modal-home.page';
import { ModalController, AlertController, NavController, LoadingController } from '@ionic/angular';
import { ServiceVoiceManagerService } from './../service-voice-manager.service';
import { User } from '../Model/user-model';
import { timeout } from 'q';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  email
  password;
  focused: boolean;
  formConnexion: FormGroup;
  constructor(public route: ActivatedRoute, public formBuild: FormBuilder, public modalCtrl: ModalController, public service: ServiceVoiceManagerService, public alertController: AlertController, public navCtrl:NavController, public loadingController: LoadingController) { 
    this.modalCtrl.dismiss({
      component : ModalHomePage,
      'dismissed': true
    });
  }

  async ngOnInit() {
    this.formConnexion = this.formBuild.group({
      email: ['', Validators.compose([Validators.required, Validators.email]) ],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(10)])]
    })
    if (this.route.snapshot.queryParams.email) {
      this.email = this.route.snapshot.queryParams.email
      this.password = this.route.snapshot.queryParams.password
      let user = {'email': this.email, 'password': this.password}
      this.connexion(user)
    }
  }
 async connexion(user) {
  this.navCtrl.navigateForward('/page-login')
  return
   console.log(user)
    //load
    const loading = await this.loadingController.create({
      spinner: "dots",
      message: 'connexion en cours...',
      cssClass: 'custom-class custom-loading',
      duration: 2000
    });
    //fin
    setTimeout(async ()=>{
      await loading.present();
    }, 1500)
    
    setTimeout(()=> {
        this.service.getUser(user).then(async (res: any)=> {
            //verification de l'usr
            if( res.response == false) {
              console.log('email n\'existe pas')
              loading.dismiss();
              await loading.onDidDismiss();
                const alert = await this.alertController.create({
                  header: 'Erreur',
                  message: "<p style='font-size: 15px;font-family: UbuntuMono-Regular'>Impossible de se conneter avec l'adresse email et le mot de passe fournis</p>",
                  buttons: [
                    {
                      text: 'Ok',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: (blah) => {
                        console.log('annulation effectuée');
                      }
                    }
                  ]
                });
                await alert.present();
            } else {
              await loading.dismiss();
              this.navCtrl.navigateForward('/page-login')
            }
            //fin
        })
    }, 3000)
  }
  onInputs() {
    this.focused = !this.focused;
    console.log(this.focused)
  }
}
