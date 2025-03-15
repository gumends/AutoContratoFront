import { Component, Input } from '@angular/core';
import { AppComponent } from "../icon/icon.component";

@Component({
  selector: 'app-card',
  imports: [AppComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() titulo: string = "";
  @Input() valor: string = "";
  @Input() subtitulo: string = "";
  @Input() icone: string = "";
}
