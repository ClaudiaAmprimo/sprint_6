import { Component } from '@angular/core';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

}
