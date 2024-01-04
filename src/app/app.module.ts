import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {StudentComponent} from "./components/student/student.component";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule

  ],
  bootstrap: [AppComponent],

})
export class AppModule {};
