import { Component } from '@angular/core';
import { TripResDetail } from '../../model/Response/trip_res_detail';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Api } from '../../service/api';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TripResCountry } from '../../model/Response/trip_res_country';
import { TripResDestinationszone } from '../../model/Response/trip_res_dest';
@Component({
  selector: 'app-repair',
  imports: [CommonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    FormsModule],
  templateUrl: './repair.html',
  styleUrl: './repair.scss'
})
export class Repair {
  idx: string = "";
  trip !: TripResDetail;
  country !: String [];
  dest !: TripResDestinationszone [];
  constructor(private activeatedRoute: ActivatedRoute,private router: Router,private route: ActivatedRoute,private Api:Api) {
    this.idx = this.route.snapshot.paramMap.get('id') || "1";
  }
  async getDetail(idx:string){
    this.trip = await lastValueFrom(this.Api.getDetail(idx));
    console.log(this.trip);
  }
  async getCountry(){
    this.country = await lastValueFrom(this.Api.getCountry());
    console.log(this.country);
  }
  async getDest(){
    this.dest = await lastValueFrom(this.Api.getDestination_zone());
    console.log(this.dest);
  }
  ngOnInit(){
    this.getDetail(this.idx);
    this.getCountry();
    this.getDest();
  }
  

  
}
