import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ServicesComponent } from '../services/services.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    PortfolioComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-portfolio></app-portfolio>
    <app-services></app-services>
    <app-about></app-about>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `
})
export class HomeComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.setPageSeo({
      title: 'Graphic Design, UX/UI & Web Development',
      description: 'Unanimous MW delivers graphic design, UX/UI design, branding, and modern website development services in Malawi.',
      path: '/',
      image: '/assets/our%20logo/black.png',
      type: 'website'
    });

    this.seoService.setOrganizationStructuredData({
      path: '/',
      description: 'Unanimous MW is a Malawi-based studio providing graphic design, UX/UI, branding, and website development services.'
    });
    this.seoService.setWebsiteStructuredData({ path: '/' });
  }
}
