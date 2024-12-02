import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  login(email:any, password:string){
    const data={
      email:email,
      password:password
    }
    return this.http.post('http://localhost:3000/api/login',data)
  }
  getOneUser(id:number){
    
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  
    return this.http.get('http://localhost:3000/api/user/'+id, { headers: header });
  }
  
}
