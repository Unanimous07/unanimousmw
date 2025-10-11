import { Routes } from '@angular/router';
import { PortfolioGalleryComponent } from './components/portfolio-gallery/portfolio-gallery.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'portfolio/:category/:subfolder', component: PortfolioGalleryComponent },
  { path: 'portfolio/:category', component: PortfolioGalleryComponent },
  { path: '**', redirectTo: '' }
];
