import { BusService } from './../service/bus.service';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton, IonTabBar, IonTabButton, IonIcon, IonInput, IonDatetime, IonAvatar } from '@ionic/angular/standalone';
import { Router ,RouterLink} from '@angular/router';
import { addIcons } from 'ionicons';
import { camera, search, person ,mail,create,trash,add,home,checkmark,close,arrowBack, } from 'ionicons/icons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';

@Component({
  selector: 'app-editbus',
  templateUrl: './editbus.page.html',
  styleUrls: ['./editbus.page.scss'],
  standalone: true,
  imports: [ IonDatetime,RouterLink, IonInput, IonIcon, IonTabButton,FormsModule, IonTabBar,  IonItem, IonLabel, IonContent,  CommonModule, FormsModule]
})
export class EditbusPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
    triggerFileInput() {
      this.fileInput.nativeElement.click();
    }
Bus ={
  bus:{
    buss: '',
    Number: '',
    departure_time:'',
    arrival_time:'',
    terminal_destination:'',
    terminal_arrival:'',
    image:''
  }
}
idb:any;
  constructor(private busService:BusService,private router: Router) {
    addIcons({ camera, search ,person, mail,create,trash,add,home,checkmark,close,arrowBack});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

   }

  
  ngOnInit() {
    this.idb = localStorage.getItem('idb');
    this.viewBus();
  }

  viewBus() {
    const idb = localStorage.getItem('idb'); // Obtener el ID del bus desde localStorage
  
    if (!idb) {
      console.error('No se encontró un ID de bus en localStorage');
      return;
    }
  
    console.log("Cargando datos del bus con ID:", idb); // Debugging
  
    this.busService.getBusById(idb).subscribe({
      next: (res) => {
        if (res && res.bus) {
          this.Bus.bus = res.bus; // Asignar los datos del bus al formulario
        }
      },
      error: (err) => {
        console.error('Error al obtener el bus', err);
      }
    });
  }
  
  updateBus() {
    const idb = localStorage.getItem('idb');
    const { buss, Number, departure_time, arrival_time, terminal_destination, terminal_arrival } = this.Bus.bus;
  
    const formattedDepartureTime = Array.isArray(departure_time) ? departure_time[0] : departure_time || '';
    const formattedArrivalTime = Array.isArray(arrival_time) ? arrival_time[0] : arrival_time || '';
  
    this.busService.updateBus(
      idb,
      buss,
      Number,
      formattedDepartureTime,
      formattedArrivalTime,
      terminal_destination,
      terminal_arrival
    ).subscribe({
      next: (res) => {
        console.log('Bus actualizado', res);
        this.router.navigate(['/admin']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        console.error('Error al actualizar bus', err);
      }
    });
  }
  setDepartureTime(event: any) {
    if (event && event.detail && event.detail.value) {
      this.Bus.bus.departure_time = Array.isArray(event.detail.value) ? event.detail.value[0] : event.detail.value;
    } else {
      this.Bus.bus.departure_time = '';
    }
  }
  
  setArrivalTime(event: any) {
    if (event && event.detail && event.detail.value) {
      this.Bus.bus.arrival_time = Array.isArray(event.detail.value) ? event.detail.value[0] : event.detail.value;
    } else {
      this.Bus.bus.arrival_time = '';
    }
  }
  updateImg(event: any) {
    const file = event.target.files[0];
  
    if (!this.idb) {
      console.error('ID del bus no definido');
      return;
    }
  
    this.busService.updateImg(this.idb, file).subscribe({
      next: (res) => {
        console.log('Imagen actualizada', res);
        this.viewBus(); // Actualizar la vista para reflejar el cambio de imagen
      },
      error: (err) => {
        console.error('Error al actualizar imagen', err);
      }
    });
  }
  
}
