import { Injectable } from '@angular/core';
import { env } from '../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripResDetail } from '../model/Response/trip_res_detail';
import { TripResCountry } from '../model/Response/trip_res_country';
import { TripResDestinationszone } from '../model/Response/trip_res_dest';
import { Trip_req_id } from '../model/Response/Request/trip_req_id';
import { Trip_req_add } from '../model/Response/Request/trip_req_add';
import { TripRes } from '../model/Response/Request/trip_res';
@Injectable({
  providedIn: 'root'
})
export class Api {
  url = env.url;
  constructor(private http: HttpClient) {}
  getTrip_page():Observable<TripRes []>{
    return this.http.get<TripRes []>(`${this.url}/trip/`)
  }
  // บอกว่า return อะไร
  getDetail(id:string):Observable<TripResDetail>{
    return this.http.get<TripResDetail>(`${this.url}/trip/${id}`)
  }
searchByCountry(name: string): Observable<TripRes[]> {
  return this.http.get<TripRes[]>(`${this.url}/trip/search/country`, {
    params: { name }
  });
}

  getCountry():Observable<String []>{
    return this.http.get<String []>(`${this.url}/trip/country`)
  }
  getDestination_zone():Observable<TripResDestinationszone []>{
    return this.http.get<TripResDestinationszone []>(`${this.url}/trip/destinations`)
  }
  setTripId(id:string,body:Trip_req_id){
    return this.http.put(`${this.url}/trip/${id}`,body)
  }
  setCreate_trip(body:Trip_req_add){
    return this.http.post(`${this.url}/trip`,body)
  }
  deleteTrip(id: string): Observable<{ message: string }> {
  return this.http.delete<{ message: string }>(`${this.url}/trip/${id}`);
}

}
