import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { API } from '../model/trip_get_res';
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
    private dialog: MatDialog
  ) {}

  trips: TripRes[] = [];
  countries: string[] = [];
  isLoading: boolean = false;
  apiEndpoint: string = '';
  
  // Search filters
  searchId: string = '';
  searchName: string = '';
  selectedCountry: string = '';

  // Selected trip for details
  selectedTrip: TripRes | null = null;
  showDetails: boolean = false;

  async ngOnInit() {
    try {
      const config: any = await lastValueFrom(this.http.get('/config.json'));
      this.apiEndpoint = config.apiEndpoint;
      console.log('✅ Loaded API endpoint:', this.apiEndpoint);
      
      // Load all trips initially and extract countries
      await this.loadAllTrips();
    } catch (err) {
      console.error('❌ Cannot load config.json', err);
    }
  }

  async loadAllTrips() {
    if (!this.apiEndpoint) return;

    this.isLoading = true;
    try {
      const url = `${this.apiEndpoint}/trip`;
      const data = await lastValueFrom(this.http.get(url));
      this.trips = data as TripRes[];
      
      // Extract unique countries for dropdown
      this.countries = [...new Set(this.trips.map(trip => trip.country))].sort();
      
      console.log('All trips loaded:', this.trips.length);
    } catch (error) {
      console.error('Error loading trips:', error);
      this.trips = [];
    } finally {
      this.isLoading = false;
    }
  }

  async searchById() {
    if (!this.searchId.trim() || !this.apiEndpoint) {
      await this.loadAllTrips();
      return;
    }

    this.isLoading = true;
    try {
      const url = `${this.apiEndpoint}/trip/${this.searchId}`;
      const data = await lastValueFrom(this.http.get(url));
      this.trips = [data as TripRes];
      console.log('Search by ID completed');
    } catch (error) {
      console.error('Error searching by ID:', error);
      this.trips = [];
    } finally {
      this.isLoading = false;
    }
  }

  async searchByName() {
    if (!this.searchName.trim() || !this.apiEndpoint) {
      await this.loadAllTrips();
      return;
    }

    this.isLoading = true;
    try {
      const url = `${this.apiEndpoint}/trip/name/${this.searchName}`;
      const data = await lastValueFrom(this.http.get(url));
      this.trips = data as TripRes[];
      console.log('Search by name completed');
    } catch (error) {
      console.error('Error searching by name:', error);
      this.trips = [];
    } finally {
      this.isLoading = false;
    }
  }

  async searchByCountry() {
    if (!this.selectedCountry || !this.apiEndpoint) {
      await this.loadAllTrips();
      return;
    }

    this.isLoading = true;
    try {
      const url = `${this.apiEndpoint}/trip/country/${this.selectedCountry}`;
      const data = await lastValueFrom(this.http.get(url));
      this.trips = data as TripRes[];
      console.log('Search by country completed');
    } catch (error) {
      console.error('Error searching by country:', error);
      this.trips = [];
    } finally {
      this.isLoading = false;
    }
  }

  clearAllFilters() {
    this.searchId = '';
    this.searchName = '';
    this.selectedCountry = '';
    this.loadAllTrips();
  }

  showTripDetails(trip: TripRes) {
    this.selectedTrip = trip;
    this.showDetails = true;
  }

  closeTripDetails() {
    this.selectedTrip = null;
    this.showDetails = false;
  }

  onSearchIdKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchById();
    }
  }

  onSearchNameKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchByName();
    }
  }
}