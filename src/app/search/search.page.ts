import { BusService } from './../service/bus.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,  IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, IonButton, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { create, search, person,trash,add, arrowBack, exit} from 'ionicons/icons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonLabel, IonTabButton,RouterLink, IonTabBar, IonButton, IonIcon, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonSearchbar, IonContent, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
Buss:any;
idtu:any;
users: any;

  constructor(private busService:BusService) { 
    addIcons({ create, search ,person, trash,add,arrowBack,exit});
        addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
    
  }

  ngOnInit() {
    this.idtu= localStorage.getItem('idtu');

  }
 searchbus(buss:any){
  this.busService.search_bus(buss.value).subscribe({
   next:(data:any)=>{
    this.Buss=data.Buss
   },
   error:(error)=>{
    console.log(error);
   }
  
    });
 }
 ionViewWillEnter() {
  this.updateUserLabel();
}
updateUserLabel() {
  this.users = localStorage.getItem('user') || 'Usuario no encontrado';
}
}
