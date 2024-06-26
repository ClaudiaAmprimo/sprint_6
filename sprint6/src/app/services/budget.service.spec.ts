import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('CalculatePrice', () => {
  it('should calculate the price of each language per page', () => {
    const calculate = new BudgetService();
    const result = calculate.calculatePrice(1,1);
    expect(result).toBe(30);
  });
});
