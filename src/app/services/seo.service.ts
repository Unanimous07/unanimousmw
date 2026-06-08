import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteName = 'Unanimous';
  private readonly defaultImage = '/assets/our%20logo/black.png';
  private readonly defaultPhone = '+265998997400';
  private readonly defaultEmail = 'hello@unanimw.com';

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  setPageSeo(options: { title: string; description: string; path?: string; image?: string; type?: string }) {
    const title = `${options.title} | ${this.siteName}`;
    const description = options.description;
    const type = options.type || 'website';
    const image = options.image || this.defaultImage;
    const url = this.buildAbsoluteUrl(options.path || '/');
    const imageUrl = this.buildAbsoluteUrl(image);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    this.meta.updateTag({ name: 'robots', content: 'index,follow,max-image-preview:large' });

    this.updateCanonical(url);
  }

  setOrganizationStructuredData(options?: {
    path?: string;
    description?: string;
    sameAs?: string[];
  }) {
    const sameAs = options?.sameAs || [
      'https://web.facebook.com/unanimous.Designs',
      'https://instagram.com/unanimous',
      'https://linkedin.com/company/unanimous'
    ];

    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.siteName,
      url: this.buildAbsoluteUrl(options?.path || '/'),
      logo: this.buildAbsoluteUrl(this.defaultImage),
      email: this.defaultEmail,
      telephone: this.defaultPhone,
      sameAs,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Blantyre',
        addressCountry: 'MW'
      },
      description: options?.description || 'Graphic design, UX/UI design, and web development studio in Malawi.'
    };

    this.upsertJsonLdScript('org-jsonld', data);
  }

  setWebsiteStructuredData(options?: { path?: string }) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      url: this.buildAbsoluteUrl(options?.path || '/')
    };

    this.upsertJsonLdScript('website-jsonld', data);
  }

  private buildAbsoluteUrl(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && window.location?.origin) {
      return `${window.location.origin}${normalized}`;
    }
    return normalized;
  }

  private updateCanonical(url: string) {
    let canonical = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  private upsertJsonLdScript(id: string, payload: Record<string, unknown>) {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      this.document.head.appendChild(script);
    }

    script.text = JSON.stringify(payload);
  }
}
