import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule ,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonTabBar, IonTabButton, IonIcon,  IonDatetime } from '@ionic/angular/standalone';
import { BusService } from '../service/bus.service';
import { cog, search, person ,mail,create,trash,add, home,close, exit,arrowBack} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-ibus',
  templateUrl: './ibus.page.html',
  styleUrls: ['./ibus.page.scss'],
  standalone: true,
  imports: [IonDatetime,  IonIcon, IonTabButton, IonTabBar, IonInput, IonButton,
    ReactiveFormsModule, IonLabel, IonItem, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule,RouterLink]
})
export class IbusPage  {
  busForm: FormGroup;
  selectedImage: File | null = null;
  users:any;
  constructor(private fb: FormBuilder, private busService: BusService, private router:Router) {
    
    this.busForm = this.fb.group({
      buss: ['', ],
      Number: ['', [ Validators.pattern(/^[0-9]+$/)]],
      departure_time: [new Date().toISOString() ],
      arrival_time: [new Date().toISOString() ],
      terminal_destination:['',],
      terminal_arrival:['',]
    });
     addIcons({ cog, search ,person, mail,create,trash,add,home,close,exit,arrowBack});
        addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
    
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit() {
    this.updateUserLabel();
    if (this.busForm.valid && this.selectedImage) {
      const { buss, Number, departure_time, arrival_time, terminal_destination ,terminal_arrival} = this.busForm.value;
  
      this.busService.createBus(buss, Number, departure_time, arrival_time, terminal_destination, terminal_arrival, this.selectedImage).subscribe(
        (response) => {
          alert('Autobús registrado exitosamente');
          this.router.navigate(['/admin']).then(() => {
            // Refresca la página después de la navegación
            window.location.reload() });;
        },
        (error) => {
          console.error('Error al registrar:', error);
          alert('Error al registrar el autobús');
        }
      );
    } else {
      alert('Por favor, completa todos los campos y selecciona una imagen');
    }
  }

  ionViewWillEnter() {
    this.updateUserLabel();
  }
  updateUserLabel() {
    this.users = localStorage.getItem('user') || 'Usuario no encontrado';
  }
}
