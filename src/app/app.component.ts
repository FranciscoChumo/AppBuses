import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ HttpClientModule, IonicModule, ReactiveFormsModule,  ],
})
export class AppComponent {
  constructor() {}
}
