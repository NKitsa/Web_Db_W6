import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { TripGetResponse } from '../model/trip_get_res';
@Component({
  selector: 'app-call-api',
  imports: [CommonModule, MatButtonModule, HttpClientModule],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss'
})
export class CallApi {
  constructor(private http: HttpClient) {}
  trips : TripGetResponse[] = [];
  async callApi() {
    const url = 'http://localhost:3000/trip';
    let data = await lastValueFrom(this.http.get(url));
    let trips = data as TripGetResponse[];
    console.log(trips);
    console.log(trips[0].name);
    console.log('Call Completed');
  }
}
