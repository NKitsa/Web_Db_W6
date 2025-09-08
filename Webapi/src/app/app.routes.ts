import { Routes } from '@angular/router';
import {AsyncDemo} from './pages/async-demo/async-demo';
import {CallApi} from './pages/call-api/call-api';
import {Postput} from './pages/postput/postput';
export const routes: Routes = [
  {path: '', component: AsyncDemo},
  {path: 'callapi', component: CallApi},
  {path: 'postput', component: Postput}
];
