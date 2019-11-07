import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'inscription', loadChildren: ()=> import('./inscription/inscription.module').then(m => m.InscriptionPageModule) },
  { path: 'modal-home', loadChildren: ()=> import('./modal-home/modal-home.module').then(m=> m.ModalHomePageModule)},
  { path: 'page-login', loadChildren: ()=> import('./page-login/page-login.module').then(m=> m.PageLoginPageModule) },
  { path: 'get-voice', loadChildren: ()=> import('./get-voice/get-voice.module').then(m=> m.GetVoicePageModule) },
  { path: 'connexion', loadChildren:()=> import('./connexion/connexion.module').then(m=> m.ConnexionPageModule) },
  { path: 'modal-record', loadChildren:()=> import('./modal-record/modal-record.module').then(m=> m.ModalRecordModule) },
  { path: 'pop-over', loadChildren:()=> import('./pop-over/pop-over.module').then(m=> m.PopOverPageModule) }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
