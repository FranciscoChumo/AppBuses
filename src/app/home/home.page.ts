import { Component } from '@angular/core';
import { IonHeader, IonToolbar,  IonContent, IonTabBar, 
  IonTabButton, IonIcon, IonLabel, IonCard, IonItem, IonInput, IonButton, IonImg } from '@ionic/angular/standalone';
import { cog, search, person ,mail,close} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';

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
  imports: [IonImg, IonButton, IonInput, IonItem, 
    IonCard, 
    IonLabel,
    IonIcon, IonTabButton, IonTabBar,
    RouterLink, IonHeader, IonToolbar,  IonContent ],
})
export class HomePage {
  
    constructor(private navCtrl: NavController) {}
  
    // Función para manejar el clic en "Sign In"
    signIn() {
      console.log('Sign In clicked');
      // Aquí puedes redirigir a la pantalla de inicio de sesión o manejar lógica
      this.navCtrl.navigateForward('/home'); // Cambia '/home' por la ruta deseada
    }
  
    // Función para manejar el clic en "Sign Up"
    signUp() {
      console.log('Sign Up clicked');
      // Aquí puedes redirigir a la pantalla de registro o manejar lógica
      this.navCtrl.navigateForward('/register'); // Cambia '/register' por la ruta deseada
    }
}
