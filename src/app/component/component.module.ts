import { Header1Component } from './../header1/header1.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "@ionic/angular";
@NgModule({
    declarations: [Header1Component],
    imports: [IonicModule],
    exports: [Header1Component],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ComponentsModule {}