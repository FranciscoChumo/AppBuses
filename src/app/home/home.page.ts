import { Component } from '@angular/core';
import { IonHeader, IonToolbar,  IonContent, IonTabBar, 
  IonTabButton, IonIcon, IonLabel, IonCard, IonItem, IonInput } from '@ionic/angular/standalone';
import { cog, search, person ,mail,close} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, 
    IonCard, 
    IonLabel,
    IonIcon, IonTabButton, IonTabBar,
    RouterLink, IonHeader, IonToolbar,  IonContent ],
})
export class HomePage {
  users:any;
  constructor() {
    addIcons({ cog, search ,person, mail,close});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

  }
  ngOnInit() {
    this.updateUserLabel();

   //this.users= localStorage.getItem('user');

  }
  ionViewWillEnter() {
    this.updateUserLabel();
  }
  updateUserLabel() {
    this.users = localStorage.getItem('user') || 'Usuario no encontrado';
  }
}
