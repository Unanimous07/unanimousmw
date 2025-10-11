import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ServicesComponent } from '../services/services.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    PortfolioComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-portfolio></app-portfolio>
    <app-services></app-services>
    <app-about></app-about>
    <app-contact></app-contact>
  `
})
export class HomeComponent {}
