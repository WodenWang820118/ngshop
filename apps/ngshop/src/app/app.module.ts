import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

import { UiModule } from '@ngshop/ui';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, AccordionModule, UiModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
