import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {
  budgetForm: FormGroup;
  nombre: FormControl;
  telefono: FormControl;
  email: FormControl;
  listaBudget: any[] = [];

  constructor(public budgetService: BudgetService){
    this.nombre = new FormControl('', Validators.required);
    this.telefono = new FormControl('', [Validators.required, Validators.pattern('^(\\+34|0034|34)?[6789]\\d{8}$')]);
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.budgetForm = new FormGroup({
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email
    })
  }

  handleBudget(): void{
    let budgetData = {
      nombre: this.budgetForm.value.nombre,
      telefono: this.budgetForm.value.telefono,
      email: this.budgetForm.value.email,
      services: this.budgetService.getServices(),
      total: this.budgetService.getTotalPrice()
    };

    this.listaBudget.push(budgetData);
    this.budgetForm.reset();
    console.log(budgetData)
    console.log(this.listaBudget)
  }
}
