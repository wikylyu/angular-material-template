import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePage,
  },
];
