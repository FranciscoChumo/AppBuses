import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../service/users.service';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader,  IonItem, IonList, IonLabel, IonInput,
    IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { cog, search, person ,mail,create,trash,add,home,checkmark,close,arrowBack} from 'ionicons/icons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { PersonService } from '../service/person.service';

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
    addIcons({ cog, search ,person, mail,create,trash,add,home,checkmark,close,arrowBack});
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

    this.personService.updatePerson(idp, name, lastname, ci, address, phone).subscribe({
        next: (data: any) => {
            console.log('Usuario actualizado:', data);
            this.viewProfile();
            this.router.navigate(['/person']).then(() => {
              // Refresca la página después de la navegación
              window.location.reload() });;

        },
        error: (error: any) => {
            console.error('Error al actualizar el usuario:', error);
        }
    });
}

}
