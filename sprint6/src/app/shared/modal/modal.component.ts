import { Component } from '@angular/core';
import { BudgetsListComponent } from '../../budgets-list/budgets-list.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [BudgetsListComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

}
