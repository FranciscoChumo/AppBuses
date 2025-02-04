import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonContent, IonTabBar, 
  IonTabButton, IonIcon, IonLabel, IonCard, IonButton, 
    IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { cog, search, person ,mail,create,trash,add, home,close, exit} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { BusService } from '../service/bus.service';
import { CommonModule,DatePipe  } from '@angular/common';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [ IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader,   CommonModule, IonButton,  IonCard, 
    IonLabel,IonIcon, IonTabButton, IonTabBar, IonHeader, 
    IonContent, RouterLink ],
    providers: [DatePipe]
})

export class AdminPage implements OnInit {
users:any;
idtu:any;
buses: any[] = [];
  constructor(private busService:BusService) {
    addIcons({ cog, search ,person, mail,create,trash,add,home,close,exit});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

   }

  ngOnInit() {
    this.updateUserLabel();
    this.idtu= localStorage.getItem('idtu');
    this.loadBuses();
  }
  loadBuses() {
    this.busService.getbus().subscribe(
      (data) => {
        this.buses = data.bus; 
      },
      (error) => {
        console.error("Error al cargar los buses", error);
      }
    );
  }
  ionViewWillEnter() {
    this.updateUserLabel();
  }
  updateUserLabel() {
    this.users = localStorage.getItem('user') || 'Usuario no encontrado';
  }
}
