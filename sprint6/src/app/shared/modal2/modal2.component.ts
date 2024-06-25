import { Component } from '@angular/core';
import { BudgetsListComponent } from '../../budgets-list/budgets-list.component';

@Component({
  selector: 'app-modal2',
  standalone: true,
  imports: [BudgetsListComponent],
  templateUrl: './modal2.component.html',
  styleUrl: './modal2.component.scss'
})
export class Modal2Component {

}
