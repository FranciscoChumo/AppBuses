import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader,  IonItem, IonList, IonLabel, IonInput,
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
import { PersonService } from '../service/person.service';
import { IUser } from '../interface/IUser';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
  standalone: true,
  imports: [ IonIcon, IonTabButton, IonTabBar,IonInput, IonLabel,RouterLink,
    IonList, IonItem,  IonContent,IonHeader,  CommonModule, FormsModule]
})
export class EdituserPage implements OnInit {
  users:any;
  profile = {
    user: {
        person: {
            name: '',
            lastname: '',
            ci: '',
            address: '',
            phone: ''
        }
    }
};
  personid:any;
  email: any ;

  constructor(private usuarioService:UsersService,private personService: PersonService, private router: Router) { 
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
  updatePerson() {
    const idp = localStorage.getItem('idp');
    const { name, lastname, ci, address, phone } = this.profile.user.person;

    console.log('Datos enviados al backend:', { idp, name, lastname, ci, address, phone });

    this.personService.updatePerson(idp, name, lastname, ci, address, phone).subscribe({
        next: (data: any) => {
            console.log('Usuario actualizado:', data);
            this.viewProfile();
            this.router.navigate(['/person']);

        },
        error: (error: any) => {
            console.error('Error al actualizar el usuario:', error);
        }
    });
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
