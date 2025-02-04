import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader,  IonItem, IonLabel, IonList, IonInput,  IonButton, IonIcon, IonTabButton, IonLoading,  IonTabBar,  IonAvatar } from '@ionic/angular/standalone';
import { UsersService } from '../service/users.service';
import { addIcons } from 'ionicons';
import { camera, search, person ,mail,create,trash,add,home,close, arrowBack} from 'ionicons/icons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { PersonService } from '../service/person.service';
import { IUser } from '../interface/IUser';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
  standalone: true,
  imports: [IonAvatar,  IonTabBar,   IonTabButton, IonIcon,
     IonInput, IonList, IonLabel, IonItem, IonContent,RouterLink,
      CommonModule, FormsModule,]
})
export class PersonPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  users: any;
  profile!: IUser;
  personid: any;
  email: any;
  edit: boolean = true;

constructor(private usuarioService: UsersService,  private personService: PersonService) { 
  this.personid = localStorage.getItem('id');
  if (!this.personid) {
    console.error('El ID de la persona no esta definido.');
  }
  
  addIcons({ camera, search, person, mail, create, trash, add, home,close,arrowBack });
  addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
}

ngOnInit() :void {
  
  this.viewProfile();
  const user = localStorage.getItem('user');
  const email = localStorage.getItem('email');

  this.users = user ? user : null;  
  this.email = email || 'Email no disponible';
}

viewProfile() {
  this.usuarioService.getOneUser(this.personid).subscribe({
    next: (data: any) => {
      this.profile = data;
    },
    error: (error: any) => {
      console.error('Error al obtener perfil:', error);
    }
  });
}
  
changeImage(event:any){
  const file = event.target.files[0];
  this.personService.updateImage(this.personid, file).subscribe({
    next:(data:any)=>{  
      this.viewProfile();
      
    },
    error:(error:any)=>{

    }
  })
}

}