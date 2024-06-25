import { Injectable } from '@angular/core';
import Budget from '../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  budget: Budget;

  constructor() {
    this.budget = {
      pages: 0,
      languages: 0
    }
  }

  calculatePrice(pages:number, languages:number):number{
    return (pages * languages) * 30;
  }
}
