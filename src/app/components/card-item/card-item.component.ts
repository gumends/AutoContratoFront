import { Component, Input } from '@angular/core';
import { AppComponent } from "../icon/icon.component";

@Component({
  selector: 'app-card-item',
  imports: [AppComponent],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
  @Input() icone: string = ""
  @Input() text_main: string = ""
  @Input() text_sub: string = ""
  @Input() value: string = ""
}
