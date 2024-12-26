import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule ,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonButton, IonInput } from '@ionic/angular/standalone';
import { BusService } from '../service/bus.service';

@Component({
  selector: 'app-ibus',
  templateUrl: './ibus.page.html',
  styleUrls: ['./ibus.page.scss'],
  standalone: true,
  imports: [IonInput, IonButton,
    ReactiveFormsModule, IonLabel, IonItem, 
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule]
})
export class IbusPage  {
  busForm: FormGroup;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private busService: BusService) {
    this.busForm = this.fb.group({
      buss: ['', ],
      Number: ['', [ Validators.pattern(/^[0-9]+$/)]],
      departure_time: [new Date().toISOString() ],
      arrival_time: [new Date().toISOString() ],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit() {
    console.log('Formulario válido:', this.busForm.valid);
    console.log('Datos del formulario:', this.busForm.value);
    console.log('Imagen seleccionada:', this.selectedImage);
    if (this.busForm.valid && this.selectedImage) {
      const { buss, Number, departure_time, arrival_time } = this.busForm.value;
  
      this.busService.createBus(buss, Number, departure_time, arrival_time, this.selectedImage).subscribe(
        (response) => {
          console.log('Autobús registrado:', response);
          alert('Autobús registrado exitosamente');
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
}
