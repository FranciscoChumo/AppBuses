import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonInput, IonAvatar, IonButton, IonIcon, IonTabButton, IonText, IonTabBar, IonLoading } from '@ionic/angular/standalone';
import { UsersService } from '../service/users.service';
import { addIcons } from 'ionicons';
import { cog, search, person ,mail,create,trash,add,home} from 'ionicons/icons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
  standalone: true,
  imports: [IonLoading,  IonTabBar, IonText,  IonTabButton, IonIcon, IonAvatar ,IonButton,
     IonInput, IonList, IonLabel, IonItem, IonContent,RouterLink,
     IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,]
})
export class PersonPage implements OnInit {
  users:any;
  profile:any = { user: {} };
  personid:any;
  email: any ;

  constructor(private usuarioService:UsersService, private router: Router) { 
    this.personid = localStorage.getItem('id');
    addIcons({ cog, search ,person, mail,create,trash,add,home});
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

  }

  ngOnInit() {
    this. viewProfile();
    this.users= localStorage.getItem('user');
    this.email = localStorage.getItem('email');

  }

  viewProfile(){
    this.usuarioService.getOneUser(this.personid).subscribe({
      next:(data:any)=>{
        this.profile=data;

      },
      error:(error:any)=>{
        debugger
      }
    })

  }

  navigateBasedOnRole() {
    const email = localStorage.getItem('email'); // Recupera el correo
  
    if (email && email.endsWith('@admin.com')) {
      this.router.navigate(['/admin']); // Redirige a admin si es un correo de admin
    } else {
      this.router.navigate(['/home']); // Redirige a home si no es admin
    }
  }

}