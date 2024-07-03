import { Component, OnInit } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { BudgetService } from '../services/budget.service';
import { BudgetsListComponent } from '../budgets-list/budgets-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PanelComponent, ReactiveFormsModule, CommonModule, BudgetsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  serviciosForm: FormGroup;
  seo: FormControl;
  ads: FormControl;
  web: FormControl;
  budgetPrice:number = 0;
  private initializing: boolean = true;

  constructor(public budgetService: BudgetService, private router: Router, private route: ActivatedRoute){
    this.seo = new FormControl(false);
    this.ads = new FormControl(false);
    this.web = new FormControl(false);

    this.serviciosForm = new FormGroup({
      seo: this.seo,
      ads: this.ads,
      web: this.web
    });

    this.web.valueChanges.subscribe(value => {
      if (!this.initializing) {
        this.handleSubmit();
      }
    });
    this.seo.valueChanges.subscribe(value => {
      if (!this.initializing) {
        this.handleSubmit();
      }
    });

    this.ads.valueChanges.subscribe(value => {
      if (!this.initializing) {
        this.handleSubmit();
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.initializing = true;

      this.seo.setValue(params['Seo'] === 'true');
      this.ads.setValue(params['Ads'] === 'true');
      this.web.setValue(params['WebPage'] === 'true');

      if (params['pages']) {
        this.budgetService.budget.pages = +params['pages'];
      }

      if (params['lang']) {
        this.budgetService.budget.languages = +params['lang'];
      }

      this.initializing = false;
      this.calculateBudget();
    });
  }

  handleSubmit(): void {
    this.calculateBudget();
    this.updateUrl(this.seo.value, this.ads.value, this.web.value, this.budgetService.budget.pages, this.budgetService.budget.languages);
  }

  calculateBudget(): void {
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


  updateUrl(seo: boolean, ads: boolean, web: boolean, pages: number, lang: number) {
    const queryParams: any = {};

    if (seo) {
      queryParams.Seo = true;
    } else {
      queryParams.Seo = false;
    }

    if (ads) {
      queryParams.Ads = true;
    } else {
      queryParams.Ads = false;
    }

    if (web) {
      queryParams.WebPage = true; {
        queryParams.pages = pages;
        queryParams.lang = lang;
      }
    } else {
      queryParams.WebPage = false;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });

    console.log(queryParams)
  }

  updateTotalPrice(price: number): void {
    this.calculateBudget();
    this.updateUrl(this.seo.value, this.ads.value, this.web.value, this.budgetService.budget.pages, this.budgetService.budget.languages);
  }

  resetServiciosForm(): void {
    this.serviciosForm.reset({
      seo: false,
      ads: false,
      web: false
    });
    this.budgetService.resetBudget();
    this.budgetPrice = 0;
    this.updateUrl(false, false, false, 1, 1);
  }
}
