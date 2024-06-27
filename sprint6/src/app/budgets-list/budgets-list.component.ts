import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(){
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
    console.log(this.budgetForm)
    this.listaBudget.push(this.budgetForm.value);
    console.log(this.listaBudget);
    this.budgetForm.reset();
    console.log(this.listaBudget)

  }
}
