import { Component, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { BudgetService } from '../services/budget.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ModalComponent, FormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  @Output() priceUpdated = new EventEmitter<number>();
  constructor(public budgetService: BudgetService){
  }
  addOnePage(){
    this.budgetService.budget.pages++;
    this.updatePrice();
  }
  removeOnePage(){
    if(this.budgetService.budget.pages > 0){
      this.budgetService.budget.pages--;
      this.updatePrice();
    }
  }
  addOneLanguage(){
    this.budgetService.budget.languages++;
    this.updatePrice();
  }
  removeOneLanguage(){
    if(this.budgetService.budget.languages > 0){
      this.budgetService.budget.languages--;
      this.updatePrice();
    }
  }

  updatePrice() {
    const price = this.budgetService.calculatePrice(
      this.budgetService.budget.pages,
      this.budgetService.budget.languages
    );
    this.priceUpdated.emit(price);
  }
}
