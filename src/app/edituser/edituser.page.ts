import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { IonContent, IonHeader, IonTitle, IonToolbar,
   IonButton, IonItem, IonList, IonLabel, IonInput,
   IonAvatar, IonTabBar, IonTabButton, IonIcon, IonLoading } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { cog, search, person ,mail,create,trash,add,home,checkmark,close} from 'ionicons/icons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
  standalone: true,
  imports: [IonLoading, IonIcon, IonTabButton, IonTabBar,
    IonAvatar, IonInput, IonLabel,
    IonList, IonItem, IonButton, IonContent,
   IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EdituserPage implements OnInit {
  users:any;
  profile:any = { user: {} };
  personid:any;
  email: any ;

  constructor(private usuarioService:UsersService, private router: Router) { 
    this.personid = localStorage.getItem('id');
    addIcons({ cog, search ,person, mail,create,trash,add,home,checkmark,close});
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
