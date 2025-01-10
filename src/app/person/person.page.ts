import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonContent, IonHeader,  IonItem, IonLabel, IonList, IonInput,  IonButton, IonIcon, IonTabButton, IonLoading, IonImg, IonTabBar } from '@ionic/angular/standalone';
import { UsersService } from '../service/users.service';
import { addIcons } from 'ionicons';
import { camera, search, person ,mail,create,trash,add,home} from 'ionicons/icons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { Router } from '@angular/router';
import { PersonService } from '../service/person.service';
import { IUser } from '../interface/IUser';
import {   HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,  } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
  standalone: true,
  imports: [IonTabBar, IonImg, IonLoading,   IonTabButton, IonIcon,IonButton,
     IonInput, IonList, IonLabel, IonItem, IonContent,RouterLink,
     IonHeader,   CommonModule, FormsModule,]
})
export class PersonPage implements OnInit {
  users: any;
  profile: Partial<IUser> = {};
  personid: any;
  email: any;
  edit: boolean = true;
  avatarUrl: string = '/assets/icon/user.png'; 
  imageSrc: string | undefined; 

  constructor(private usuarioService: UsersService, private router: Router,private route: ActivatedRoute, private personService: PersonService,private http: HttpClient) { 
    this.personid = localStorage.getItem('id');
    if (!this.personid) {
      console.error('El ID de la persona no esta definido.');
    }
    
    addIcons({ camera, search, person, mail, create, trash, add, home });
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });
  }

  ngOnInit() :void {
   
    this.viewProfile();
    this.loadUserAvatar();
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
  
  
  loadUserAvatar() {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      this.http.get(`${environment.apiUrl}/avatar/${userId}`).subscribe(
        (response: any) => {
          if (response && response.avatarUrl) {
            this.avatarUrl = response.avatarUrl; 
          }
        },
        (error) => {
          console.error('Error al cargar el avatar', error);
        }
      );
    }
  }
  
  onImageChange(event: any): void {
    const file = event.target.files[0]; 

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; 
      };
      reader.readAsDataURL(file); 

      this.uploadImage(file);
    }
  }


uploadImage(file: File): void {
  const formData = new FormData();
  formData.append('avatar', file, file.name);

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });

  this.http.post(`${environment.apiUrl}/upload`, formData, { headers }).subscribe(
    (response: any) => {
      console.log('Imagen cargada exitosamente', response);
      this.avatarUrl = response.avatarUrl; // Actualizar la URL del avatar en la UI
    },
    (error) => {
      console.error('Error al cargar la imagen', error);
    }
  );
}

  
 
  navigateBasedOnRole() {
    const email = localStorage.getItem('email');
    if (email && email.endsWith('@admin.com')) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}