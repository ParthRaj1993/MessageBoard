import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent,createOrEditMessage } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdInputModule,MdCardModule,MdButtonModule,MdDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,createOrEditMessage
  ],
  entryComponents: [createOrEditMessage],
  imports: [
    BrowserModule,BrowserAnimationsModule,HttpModule,MdInputModule,MdCardModule,MdButtonModule,MdDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
