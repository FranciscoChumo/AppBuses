import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreaterService {

  constructor(private crear:HttpClient) { }
  register(user:any,email:any,password:string){
    const re={
      user:user,
      email:email,
      password:password
    }
    return this.crear.post('http://localhost:3000/api/register',re)
  }
}
