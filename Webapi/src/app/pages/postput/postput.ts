import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReqPostput } from '../model/trip_post_req';   // ✅ import interface

@Component({
  selector: 'app-postput',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './postput.html',
  styleUrl: './postput.scss',
})
export class Postput {
  constructor(private http: HttpClient) {}

  trip: ReqPostput = {
    idx: 0,
    name: '',
    country: '',
    destinationid: 0,
    detail: '',
    price: 0,
    duration: 0
  };

  insertTrip() {
    const url = 'http://localhost:3000/trip/newdata';
    this.http.post(url, this.trip).subscribe({
      next: (res) => {
        console.log('Insert success:', res);
        alert('Insert success ✅');
      },
      error: (err) => {
        console.error('Insert error:', err);
        alert('Insert failed ❌');
      }
    });
  }
}
