import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  register(user:any,email:any,password:string,typeusers_id:number){
    const re={
      user:user,
      email:email,
      password:password,
      typeusers_id:typeusers_id
    }
    return this.http.post('http://localhost:3000/api/register',re)
  }

  login(email:any, password:string){
    const data={
      email:email,
      password:password
    }
    return this.http.post('http://localhost:3000/api/login',data)
  }
  getOneUser(id: number): Observable<any> {
    if (!id) {
      console.error('El ID del usuario no es válido.');
      return throwError(() => new Error('ID no válido'));
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token en localStorage.');
      return throwError(() => new Error('Falta el token de autenticación'));
    }

    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    const url = `http://localhost:3000/api/user/${id}`;
    return this.http.get(url, { headers: header }).pipe(
      catchError(error => {
        console.error('Error al obtener el usuario:', error);
        return throwError(() => error); 
      })
    );
  }
  
}
