import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }
  updatePerson(id:number,name:string, lastname:string,ci:string,address:string, phone:number){
    const data ={
      id:id,
      name:name,
      lastname:lastname,
      ci:ci,
      address:address,
      phone:phone
    }
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<any>('http://127.0.0.1:3000/api/person/'+id, data, { headers: header });
  }
  avatarI(id: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('avatar', file, file.name); // Agrega el archivo al formulario
    formData.append('id', id.toString()); // Incluye el ID como parte de los datos enviados
  
    const header = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`); // Agrega el token de autorización
  
    return this.http.post<any>('http://127.0.0.1:3000/api/upload' + id, formData, { headers: header });
  }
  
  getAvatar(id: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:3000/api/avatar/${id}`);
  }
  
  
}
