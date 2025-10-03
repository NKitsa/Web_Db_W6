import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TripRes } from '../../model/Response/Request/trip_res';
import { Router } from '@angular/router';
import { Api } from '../../service/api';
import { TripResDetail } from '../../model/Response/trip_res_detail';
import { ResName } from '../../model/Response/trip_res_name';
@Component({
  selector: 'app-call-api',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './call-api.html',
  styleUrl: './call-api.scss'
})
export class CallApi implements OnInit {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private Api:Api

  ) {}

  trips!: TripRes [];
  trip_name!: ResName [];
  trip_idx !: TripResDetail;
  idx: string = "";
  country!: String[];
  searchcountry: String = "-- เลือกประเทศ --";
  searchname: String = "";
  tripId: String = "";

  async ngOnInit() {
   this.getTrip();
   this.getCountry();
  }
  async searchCountry() {
  try {
    this.trips = await lastValueFrom(this.Api.searchByCountry(this.searchcountry as string));
    console.log("ผลลัพธ์:", this.trips);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
  }
}
async searchName() {
  try {
    this.trips = await lastValueFrom(this.Api.searchByName(this.searchname as string));
    console.log("ผลลัพธ์ (ค้นหาตามชื่อ):", this.trips);
  } catch (err) {
    console.error("เกิดข้อผิดพลาด (searchName):", err);
  }
}
async searchById() {
    try {
      this.trips = await lastValueFrom(this.Api.getId(this.tripId as string));
      console.log("ผลลัพธ์ (ค้นหาตาม ID):", this.trips);
    } catch (err) {
      console.error("เกิดข้อผิดพลาด:", err);
    }
  }
async getCountry(){
    this.country = await lastValueFrom(this.Api.getCountry());
    console.log(this.country);
  }
  async getTrip(){
    this.trips = await lastValueFrom(this.Api.getTrip_page());
    console.log(this.trips);
  }
  async get_id(idx:string){
    this.trip_idx = await lastValueFrom(this.Api.getDetail(idx));
    console.log(this.trip_idx);
  }

   goToDetail(idx: number) {
  this.router.navigateByUrl(`/detail/${idx}`);
}
  goToCreate() {
  this.router.navigate(["/adddata"]);
}
}
