import { Injectable } from '@angular/core';
import Budget from '../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budget: Budget;

  constructor() {
    this.budget = {
      pages: 1,
      languages: 1,
      services: [],
      totalPrice: 0
    }
  }

  calculatePrice(pages:number, languages:number):number{
    return (pages * languages) * 30;
  }

  setServices(services: { name: string; price: number; pages?: number; languages?: number }[]) {
    this.budget.services = services;
    this.budget.totalPrice = services.reduce((sum, service) => sum + service.price, 0);
  }

  getServices() {
    return this.budget.services;
  }

  getTotalPrice() {
    return this.budget.totalPrice;
  }

  resetBudget(): void {
    this.budget.pages = 1;
    this.budget.languages = 1;
    this.budget.services = [];
    this.budget.totalPrice = 0;
  }
}
