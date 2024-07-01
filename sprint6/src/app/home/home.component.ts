import { Component } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import {ReactiveFormsModule, FormGroup, FormControl} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BudgetService } from '../services/budget.service';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PanelComponent, ReactiveFormsModule, CommonModule, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  serviciosForm: FormGroup;
  seo: FormControl;
  ads: FormControl;
  web: FormControl;
  budgetPrice:number = 0;

  constructor(public budgetService: BudgetService){
    this.seo = new FormControl(false);
    this.ads = new FormControl(false);
    this.web = new FormControl(false);

    this.serviciosForm = new FormGroup({
      seo: this.seo,
      ads: this.ads,
      web: this.web
    });

    this.web.valueChanges.subscribe(value => {
      this.handleSubmit();
    });
  }

  handleSubmit():void{
    let formSubmited = this.serviciosForm.value
    let seo = formSubmited.seo
    let ads = formSubmited.ads
    let web = formSubmited.web

    this.budgetPrice = 0;
    let services = [];

    if(seo === true){
      this.budgetPrice += 300;
      services.push({ name: 'Seo', price: 300 });
    }
    if(ads === true){
      this.budgetPrice += 400;
      services.push({ name: 'Ads', price: 400 });
    }
    if(web === true){
      const webPrice = this.budgetService.calculatePrice(
        this.budgetService.budget.pages,
        this.budgetService.budget.languages
      );
      this.budgetPrice += 500 + webPrice;
      services.push({
        name: 'Web',
        price: 500 + webPrice,
        pages: this.budgetService.budget.pages,
        languages: this.budgetService.budget.languages
      });
    }
    this.budgetService.setServices(services);
  }

  updateTotalPrice(price: number) {
    let formSubmited = this.serviciosForm.value;
    let seo = formSubmited.seo;
    let ads = formSubmited.ads;
    let web = formSubmited.web;

    this.budgetPrice = 0;
    let services = [];

    if (seo === true) {
      this.budgetPrice += 300;
      services.push({ name: 'Seo', price: 300 });
    }
    if (ads === true) {
      this.budgetPrice += 400;
      services.push({ name: 'Ads', price: 400 });
    }
    if (web === true) {
      this.budgetPrice += 500 + price;
      services.push({
        name: 'Web',
        price: 500 + price,
        pages: this.budgetService.budget.pages,
        languages: this.budgetService.budget.languages
      });
    }
    this.budgetService.setServices(services);
    console.log(services)
  }
}
