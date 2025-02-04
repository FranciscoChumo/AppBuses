import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private htp:HttpClient) { }

  createBus(buss: string, Number: number, departure_time: string, arrival_time: string,terminal_destination:string,terminal_arrival:string, image: File) {
    const formData = new FormData();
    formData.append('buss', buss);
    formData.append('Number', Number.toString());
    formData.append('departure_time', departure_time);
    formData.append('arrival_time', arrival_time);
    formData.append('terminal_destination',terminal_destination);
    formData.append('terminal_arrival',terminal_arrival)
    formData.append('image', image);

    return this.htp.post('http://localhost:3000/api/registerbus', formData);
  }

  getbus():Observable<any>{
    return this.htp.get('http://localhost:3000/api/bus');
  }

  search_bus(buss:any){
    const data ={
      buss:buss
    }
    return this.htp.post<any>('http://localhost:3000/api/Search/bus',data);
 
  }
}
