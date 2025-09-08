import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { API } from '../model/trip_get_res';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-call-api',
  imports: [CommonModule, MatButtonModule, HttpClientModule, MatInputModule, MatCardModule, MatListModule],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss'
})
export class CallApi {
  constructor(private http: HttpClient) {}

  trips: API[] = [];
  isLoading: boolean = false;

  async callApi() {
    const url = 'http://localhost:3000/trip';
    let data = await lastValueFrom(this.http.get(url));
    let trips = data;
    console.log(trips);
    console.log('Call Completed');
  }

  async findname(input: HTMLInputElement) {
    if (!input.value.trim()) {
      this.trips = [];
      return;
    }

    this.isLoading = true;
    try {
      const url = `http://localhost:3000/trip/name/${input.value}`;
      let data = await lastValueFrom(this.http.get(url));
      this.trips = data as API[];
      console.log(this.trips);

      if (this.trips.length > 0) {
        console.log(this.trips[0].name);
      }
      console.log('Call Completed');
    } catch (error) {
      console.error('Error fetching trips:', error);
      this.trips = [];
    } finally {
      this.isLoading = false;
    }
  }

}
