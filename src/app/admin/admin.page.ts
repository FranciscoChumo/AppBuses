import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [ IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader,   CommonModule, IonButton,  IonCard, 
    IonLabel,IonIcon, IonTabButton, IonTabBar, IonHeader, 
    IonContent, RouterLink ],
  
})

export class AdminPage implements OnInit {
users:any;
idtu:any;
buses: any[] = [];
  constructor(private busService:BusService,private router: Router) {
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
        console.log("Datos de los buses obtenidos:", data);
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

  editBus(id: string) {
    if (!id) {
      console.error("Error: ID del bus es undefined o no existe en los datos");
      return;
    }
  
    localStorage.setItem('idb', id);
    console.log("ID del bus guardado en localStorage:", localStorage.getItem('idb'));
    this.router.navigate(['/editbus']).then(() => {
      window.location.reload();
    });
  }
  
  deleteBus(id: string) {
  if (confirm("¿Estás seguro de que quieres eliminar este bus?")) {
    this.busService.deleteBus(id).subscribe({
      next: (res) => {
        console.log("Bus eliminado:", res);
        this.loadBuses(); // Recargar la lista de buses actualizada
      },
      error: (err) => {
        console.error("Error al eliminar el bus:", err);
      }
    });
  }
}
Cerrar(){
  localStorage.clear();
  this.router.navigate(['/home']);
}
  
}
