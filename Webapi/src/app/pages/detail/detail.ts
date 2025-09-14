import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripResDetail } from '../../model/Response/trip_res_detail';
import { Api } from '../../service/api';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-detail',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss'
})
export class Detail {
  idx: string = "";
  trip !: TripResDetail;
  constructor(private activeatedRoute: ActivatedRoute,private router: Router,private route: ActivatedRoute,private Api:Api) {
    this.idx = this.route.snapshot.paramMap.get('id') || "1";
  }
  async getDetail(idx:string){
    this.trip = await lastValueFrom(this.Api.getDetail(idx));
    console.log(this.trip);
  }
  goToRepair(idx: number) {
  this.router.navigateByUrl(`/repair/${idx}`);
}
  ngOnInit(){
    this.getDetail(this.idx);
  }
  
}
