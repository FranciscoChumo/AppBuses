import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private htp:HttpClient) { }
  createBus(buss: string, Number: number, departure_time: string, arrival_time: string, image: File) {
    const formData = new FormData();
    formData.append('buss', buss);
    formData.append('Number', Number.toString());
    formData.append('departure_time', departure_time);
    formData.append('arrival_time', arrival_time);
    formData.append('image', image);

    return this.htp.post('http://localhost:3000/api/registerbus', formData);
  }
}
