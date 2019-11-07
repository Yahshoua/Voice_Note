import { ServiceVoiceManagerService } from './../service-voice-manager.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.css'],
})
export class InscriptionPage implements OnInit {
  focused: boolean;
  FormInscription: FormGroup;
  constructor(private FormBuilder: FormBuilder, private service: ServiceVoiceManagerService, public loadingController: LoadingController, public alertController: AlertController, public navCtrl: NavController) {
  }
  onInputs() {
    this.focused = !this.focused;
    console.log(this.focused)
  }

  ngOnInit() {
    this.FormInscription = this.FormBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.minLength(4),Validators.maxLength(7), Validators.required])]
    })
  }
 async inscription() {
    let form = this.FormInscription.value
    const loading = await this.loadingController.create({
      spinner: "lines",
      message: 'inscription en cours...',
      cssClass: 'custom-class custom-loading'
    });
    setTimeout(async ()=>{
          await loading.present();
    }, 1500)
    // const { role, data } = await loading.onDidDismiss();
    setTimeout(()=> {
    this.service.setUser(form).then(async (res: any) => {
          
          if( res.response == false) {
            console.log('email existe')
            loading.dismiss();
            await loading.onDidDismiss();
              const alert = await this.alertController.create({
                header: 'Erreur',
                message: "<p style='font-size: 15px;font-family: UbuntuMono-Regular'>L\'adresse email est dèjà associée à on compte Note Voice !</p>",
                buttons: [
                  {
                    text: 'ANNULER',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                      console.log('annulation effectuée');
                    }
                  }, {
                    text: 'CONNEXION',
                    handler: () => {
                      console.log('redirection à la page de connexion');
                      this.navCtrl.navigateForward('/connexion', {queryParams: {email: form.Email, password: form.password } } )
                    }
                  }
                ]
              });
          
              await alert.present();
          } else {
            console.log('utlisateur créer !')
            await loading.dismiss();
          }
          console.log(loading)
        })
    }, 3000)
    
  }
}
