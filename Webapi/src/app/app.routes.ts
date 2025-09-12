import { Routes } from '@angular/router';
import { CallApi } from './pages/call-api/call-api';
import { Repair } from './pages/repair/repair';
import { Detail } from './pages/detail/detail';

export const routes: Routes = [
  {path: '', component: CallApi},
  {path: 'repair/:id', component: Repair},
  { path: 'detail/:id', component: Detail }
];
