import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonContent, IonTabBar, 
  IonTabButton, IonIcon, IonLabel, IonCard, IonButton, IonFab, IonFabButton, IonInput, IonItem, IonLoading } from '@ionic/angular/standalone';
import { cog, search, person ,mail,create,trash,add, home,close, exit} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonLoading, IonItem, IonInput, IonFabButton, IonFab, IonButton,  IonCard, 
    IonLabel,
    IonIcon, IonTabButton, IonTabBar, IonHeader, 
    IonToolbar , IonContent, RouterLink ],
})
export class AdminPage implements OnInit {
users:any;
  constructor() {
    addIcons({ cog, search ,person, mail,create,trash,add,home,close,exit});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

   }

  ngOnInit() {
   this.users= localStorage.getItem('user');

  }

}
