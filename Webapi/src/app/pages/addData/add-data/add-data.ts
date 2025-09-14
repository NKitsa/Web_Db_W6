import { Component } from '@angular/core';
import { TripResDetail } from '../../../model/Response/trip_res_detail';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Api } from '../../../service/api';
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
import { TripResCountry } from '../../../model/Response/trip_res_country';
import { TripResDestinationszone } from '../../../model/Response/trip_res_dest';
import { Trip_req_id } from '../../../model/Response/Request/trip_req_id';
import { Trip_req_add } from '../../../model/Response/Request/trip_req_add';
@Component({
  selector: 'app-adddata',
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
  templateUrl: './add-data.html',
  styleUrl: './add-data.scss'
})
export class AddData {
  trip !: TripResDetail;
  country !: String [];
  dest !: TripResDestinationszone [];
create_trip: Trip_req_add = {
  name: '',
  country: '',
  coverimage: '',
  destinationid: 0,
  duration: 0,
  price: 0,
  detail: ''
};
  constructor(private activeatedRoute: ActivatedRoute,private router: Router,private route: ActivatedRoute,private Api:Api) {
    
  }
  
  async getCountry(){
    this.country = await lastValueFrom(this.Api.getCountry());
    console.log(this.country);
  }
  async getDest(){
    this.dest = await lastValueFrom(this.Api.getDestination_zone());
    console.log(this.dest);
  }
  async setCreate_trip(){
    await lastValueFrom(this.Api.setCreate_trip(this.create_trip));
    this.router.navigate(["/"]);
    // console.log(this.create_trip)
  }
  
  ngOnInit(){
    this.getCountry();
    this.getDest();

  }

  

  
}
