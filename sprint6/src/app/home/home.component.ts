import { Component } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PanelComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  serviciosForm: FormGroup;
  seo: FormControl;
  ads: FormControl;
  web: FormControl;
  budgetPrice:number = 0;

  constructor(){
    this.seo = new FormControl(false);
    this.ads = new FormControl(false);
    this.web = new FormControl(false);

    this.serviciosForm = new FormGroup({
      seo: this.seo,
      ads: this.ads,
      web: this.web
    })
  }

  handleSubmit():void{
    let formSubmited = this.serviciosForm.value
    let seo = formSubmited.seo
    let ads = formSubmited.ads
    let web = formSubmited.web

    this.budgetPrice = 0;

    if(seo === true){
      this.budgetPrice += 300;
    }
    if(ads === true){
      this.budgetPrice += 400;
    }
    if(web === true){
      this.budgetPrice += 500;
    }
  }
}
