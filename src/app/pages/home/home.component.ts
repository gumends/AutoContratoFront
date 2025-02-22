import { Component } from '@angular/core';
import { MainContantComponent } from "../../components/main-contant/main-contant.component";

import { HlmTableModule } from "../../../../libs/ui/ui-table-helm/src/index";

@Component({
  
  imports: [MainContantComponent, HlmTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
