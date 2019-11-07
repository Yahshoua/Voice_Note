import { PageLoginPageModule } from './../page-login/page-login.module';
import { ModalRecordComponent } from './modal-record.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    component: ModalRecordComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageLoginPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalRecordComponent]
})
export class ModalRecordModule {}
