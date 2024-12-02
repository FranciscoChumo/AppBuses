import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule,AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CreaterService } from '../service/creater.service';
import { Router } from '@angular/router';
import { home} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [ IonicModule,  CommonModule, FormsModule,
     HttpClientModule, ReactiveFormsModule,RouterLink],
  providers:[CreaterService]
})
export class CreatePage  {
  registerForm:FormGroup;
  constructor(
   
    private create:CreaterService, 
    private alert:AlertController,
    private form:FormBuilder,
    private router:Router 
  ) { 
    addIcons({home });
    addIcons({ chevronDownCircle, chevronForwardCircle, chevronUpCircle, colorPalette, document, globe });

    this.registerForm = this.form.group({
      user:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
    })
  }
 

  async register(){
  // Muestra una alerta para los campos vacíos
    if(this.registerForm.invalid){
      const alert=await this.alert.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos',
        buttons: ['OK'] 
      });
      await alert.present();
      return;
    }
    //navegacion entre pagina
    this.router.navigate(['/home']);
    const {user, email, password}=this.registerForm.value;
    this.create.register(user,email,password) .subscribe({
      next:async (data:any)=>{
      if(data&&data.token){
        const alert = await this.alert.create({
        header:'Success!' , 
        message:'register successful',
        buttons:['OK']
      }); 
      await alert.present();
      if (email.includes('@admin.com')) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
      }
    },
      error:async(error:any)=>{
      console.error("error register",error);
      const alert = await this.alert.create({
        header:'Error',
        message:'Ocurred un error en el register',
        buttons:['OK']
      });
      await alert.present();
      this.registerForm.reset(); // Restablece todos los campos del formulario

    },
    });
  }
}
