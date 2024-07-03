import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budgets-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent {
  budgetForm: FormGroup;
  nombre: FormControl;
  telefono: FormControl;
  email: FormControl;
  
  listaBudget: any[] = [];
  filteredResults: any[] = [];
  sortImage: { [key: string]: boolean } = {
    nombre: true,
    total: true,
    date: true
  };
  activeSort: string = '';

  constructor(public budgetService: BudgetService){
    this.nombre = new FormControl('', Validators.required);
    this.telefono = new FormControl('', [Validators.required, Validators.pattern('^(\\+34|0034|34)?[6789]\\d{8}$')]);
    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.budgetForm = new FormGroup({
      nombre: this.nombre,
      telefono: this.telefono,
      email: this.email
    });

    this.filteredResults = this.listaBudget;
  }

  handleBudget(): void{
    let budgetData = {
      nombre: this.budgetForm.value.nombre,
      telefono: this.budgetForm.value.telefono,
      email: this.budgetForm.value.email,
      services: this.budgetService.getServices(),
      total: this.budgetService.getTotalPrice(),
      date: new Date()
    };

    this.listaBudget.push(budgetData);
    this.filteredResults = this.listaBudget;
    this.budgetForm.reset();
    console.log(budgetData)
    console.log(this.listaBudget)
  }

  sortBudgetBy(key: string): void {
    this.activeSort = key;
    this.sortImage[key] = !this.sortImage[key];
    if (key === 'total') {
      this.listaBudget.sort((a, b) => this.sortImage[key] ? a.total - b.total : b.total - a.total);
    } else if (key === 'date') {
      this.listaBudget.sort((a, b) => this.sortImage[key] ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (key === 'nombre') {
      this.listaBudget.sort((a, b) => this.sortImage[key] ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre));
    }
    this.filteredResults = [...this.listaBudget];
  }


  filterResults(name: string): void {
    if (name.trim() === '') {
      this.filteredResults = this.listaBudget;
    } else {
      this.filteredResults = this.listaBudget.filter(item => item.nombre.toLowerCase().includes(name.toLowerCase()));
    }
    console.log(this.filteredResults);
    console.log(this.listaBudget)
  }
}
