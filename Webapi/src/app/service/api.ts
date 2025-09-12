import { Injectable } from '@angular/core';
import { env } from '../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripResDetail } from '../model/Response/trip_res_detail';
import { TripResCountry } from '../model/Response/trip_res_country';
import { TripResDestinationszone } from '../model/Response/trip_res_dest';
@Injectable({
  providedIn: 'root'
})
export class Api {
  url = env.url;
  constructor(private http: HttpClient) {}
  // บอกว่า return อะไร
  getDetail(id:string):Observable<TripResDetail>{
    return this.http.get<TripResDetail>(`${this.url}/trip/${id}`)
  }
  getCountry():Observable<String []>{
    return this.http.get<String []>(`${this.url}/trip/country`)
  }
  getDestination_zone():Observable<TripResDestinationszone []>{
    return this.http.get<TripResDestinationszone []>(`${this.url}/trip/destinations`)
  }
}
