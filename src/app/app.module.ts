import { PopOverPageModule } from './pop-over/pop-over.module';
import { ModalRecordModule } from './modal-record/modal-record.module';
import { HomePageModule } from './home/home.module';
import { MapageComponent } from './mapage/mapage.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalHomePageModule } from './modal-home/modal-home.module';
import { HttpClientModule } from '@angular/common/http';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, ReactiveFormsModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ModalHomePageModule, ModalRecordModule, PopOverPageModule ],
  providers: [
    StatusBar,
    Media,
    File,
    NativeAudio,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
