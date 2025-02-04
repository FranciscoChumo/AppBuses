import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule,AlertController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { home} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import{ chevronDownCircle,
  chevronForwardCircle,
  chevronUpCircle,
  colorPalette,
  document,
  globe,}from 'ionicons/icons';
import { UsersService } from '../service/users.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [ IonicModule,  CommonModule, FormsModule,
     ReactiveFormsModule,RouterLink],
})
export class CreatePage  {
  registerForm:FormGroup;
  constructor(
    private user:UsersService,
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
      typeusers_id: [2] // Valor predeterminado
    })
  }
 

  async register() {
    // Muestra una alerta para los campos vacíos
    if (this.registerForm.invalid) {
        const alert = await this.alert.create({
            header: 'Error',
            message: 'Por favor, complete todos los campos',
            buttons: ['OK']
        });
        await alert.present();
        return;
    }

    // Navegación entre páginas
    const { user, email, password } = this.registerForm.value;

    // Agregar typeusers_id manualmente con valor predeterminado de 2
    const typeusers_id = 2;

    this.user.register(user, email, password, typeusers_id).subscribe({
        next: async (data: any) => {
            if (data && data.token) {
                const alert = await this.alert.create({
                    header: 'Success!',
                    message: 'Register successful',
                    buttons: ['OK']
                });
                await alert.present();

                // Navegar a la página de admin después del registro
                this.router.navigate(['/admin']);
            }
        },
        error: async (error: any) => {
            console.error("error register", error);
            const alert = await this.alert.create({
                header: 'Error',
                message: '  error en el register',
                buttons: ['OK']
            });
            await alert.present();
        }
    });

    // Restablece todos los campos del formulario
    this.registerForm.reset();
}

}
