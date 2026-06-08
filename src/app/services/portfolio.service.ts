import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

export interface PortfolioFolder {
  name: string;
  path: string;
  thumbnail: string;
  thumbnailType?: 'image' | 'logo';
  description: string;
  itemCount: number;
  itemLabel?: string;
  routeSegment: string;
  discipline: 'branding' | 'ux-ui' | 'web';
  externalUrl?: string;
  caseStudy: {
    challenge: string;
    approach: string;
    outcome: string;
  };
}

export interface GalleryItem {
  name: string;
  path: string;
  isFolder: boolean;
  thumbnail?: string;
}

type PortfolioNode = {
  type: 'folder' | 'file';
  name: string;
  path: string;
  url?: string;
  coverUrl?: string;
  children?: PortfolioNode[];
};

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly webShowcaseProjects: PortfolioFolder[] = [
    {
      name: 'Impact Horti Website',
      path: 'external/impacthorti',
      thumbnail: '/assets/Logos/impact.jpg',
      description: 'Corporate website design and development focused on clear service communication and trust-building user journeys.',
      itemCount: 1,
      itemLabel: 'live site',
      routeSegment: 'impacthorti',
      discipline: 'web',
      externalUrl: 'https://www.impacthorti.com',
      caseStudy: {
        challenge: 'Present agricultural expertise in a format that is modern, credible, and easy for partners to navigate quickly.',
        approach: 'Structured pages around key audience intents, applied responsive layouts, and optimized the information hierarchy for clarity.',
        outcome: 'Launched a production-ready site that communicates capabilities clearly and supports stronger first-contact conversion.'
      }
    },
    {
      name: 'OHCON MW Website',
      path: 'external/ohconmw',
      thumbnail: '/assets/Logos/ohcon.png',
      thumbnailType: 'logo',
      description: 'Institutional website built to showcase organizational programs, credibility, and public-facing communication.',
      itemCount: 1,
      itemLabel: 'live site',
      routeSegment: 'ohconmw',
      discipline: 'web',
      externalUrl: 'https://www.ohconmw.org',
      caseStudy: {
        challenge: 'Make organization information and initiatives accessible while maintaining a professional and trustworthy presentation.',
        approach: 'Designed a clean content architecture with responsive components and readable visual hierarchy across devices.',
        outcome: 'Delivered a maintainable website that strengthens visibility and helps stakeholders find core information faster.'
      }
    }
  ];

  private readonly emptyRoot: PortfolioNode = {
    type: 'folder',
    name: 'Home',
    path: '',
    children: []
  };

  private readonly featuredCategoryOrder = [
    'Branding',
    'Flyers',
    'posters',
    'business cards',
    'Tshirts',
    'Caps',
    'banners',
    'Product stickers',
    'Invitations',
    'Business profile',
    'social media cover',
    'Logos'
  ];

  private readonly categoryDescriptions: Record<string, string> = {
    branding: 'Complete brand identity packages and corporate branding solutions.',
    flyers: 'Event and promotional flyer designs.',
    posters: 'Large format poster designs.',
    'business cards': 'Professional business card designs.',
    tshirts: 'Custom t-shirt designs.',
    caps: 'Custom cap designs.',
    banners: 'Digital banners and billboard designs.',
    'product stickers': 'Product stickers and label design work.',
    invitations: 'Wedding and event invitation designs.',
    'business profile': 'Company profile and brochure designs.',
    'social media cover': 'Social media graphics and cover design.',
    logos: 'Logo concepts and identity marks.'
  };

  private readonly categoryDisciplines: Record<string, 'branding' | 'ux-ui' | 'web'> = {
    branding: 'branding',
    logos: 'branding',
    flyers: 'branding',
    posters: 'branding',
    'business cards': 'branding',
    tshirts: 'branding',
    caps: 'branding',
    banners: 'branding',
    'product stickers': 'branding',
    invitations: 'branding',
    'business profile': 'ux-ui',
    'social media cover': 'ux-ui'
  };

  private readonly categoryOutcomes: Record<string, string> = {
    branding: 'Built a cohesive identity system clients can scale across channels.',
    logos: 'Delivered distinctive marks that improve recognition and brand recall.',
    flyers: 'Improved campaign visibility with high-impact, event-ready layouts.',
    posters: 'Produced attention-grabbing visuals optimized for large-format print.',
    'business cards': 'Created premium handout assets that reinforce first impressions.',
    tshirts: 'Turned brand elements into wearable designs that drive visibility.',
    caps: 'Developed merch concepts that keep the brand visible in everyday use.',
    banners: 'Shipped billboard and digital banner concepts designed for fast readability.',
    'product stickers': 'Designed labels that increase shelf appeal and product clarity.',
    invitations: 'Crafted event invites that communicate tone, hierarchy, and elegance.',
    'business profile': 'Structured profile layouts for clearer information flow and readability.',
    'social media cover': 'Designed platform-ready cover systems for stronger online presence.'
  };

  private readonly tree$: Observable<PortfolioNode>;

  constructor(private http: HttpClient) {
    this.tree$ = this.http.get<PortfolioNode>('/assets/portfolio-index.json').pipe(
      catchError((error) => {
        console.error('Failed to load portfolio index:', error);
        return of(this.emptyRoot);
      }),
      shareReplay(1)
    );
  }

  getPortfolioFolders(): Observable<PortfolioFolder[]> {
    return this.tree$.pipe(
      map((root) => {
        const folders = (root.children || []).filter((node) => node.type === 'folder');
        const byName = new Map(
          folders.map((folder) => [folder.name.toLowerCase(), folder])
        );

        const orderedFeatured = this.featuredCategoryOrder
          .map((name) => byName.get(name.toLowerCase()))
          .filter((folder): folder is PortfolioNode => !!folder)
          .map((folder) => this.toPortfolioFolder(folder));

        return [...this.webShowcaseProjects, ...orderedFeatured];
      })
    );
  }

  getGalleryItems(category: string): Observable<GalleryItem[]> {
    return this.tree$.pipe(
      map((root) => {
        const folder = this.findFolder(root, [this.decodeSegment(category)]);
        if (!folder) return [];

        return (folder.children || [])
          .filter((child) => child.type === 'folder' || child.type === 'file')
          .map((child) => this.toGalleryItem(child));
      })
    );
  }

  getSubfolderItems(category: string, subfolder: string): Observable<GalleryItem[]> {
    return this.tree$.pipe(
      map((root) => {
        const folder = this.findFolder(root, [this.decodeSegment(category), this.decodeSegment(subfolder)]);
        if (!folder) return [];

        return (folder.children || [])
          .filter((child) => child.type === 'file')
          .map((file) => this.toGalleryItem(file));
      })
    );
  }

  private toPortfolioFolder(folder: PortfolioNode): PortfolioFolder {
    const key = folder.name.toLowerCase();
    const thumbnail = folder.coverUrl || this.findFirstImageUrl(folder) || '/assets/our%20logo/black.png';
    const discipline = this.categoryDisciplines[key] || 'branding';
    const displayName = this.toDisplayName(folder.name);

    return {
      name: displayName,
      path: folder.path,
      thumbnail,
      description: this.categoryDescriptions[key] || 'Creative design projects and visual work.',
      itemCount: this.countFiles(folder),
      routeSegment: folder.name,
      discipline,
      caseStudy: {
        challenge: `Translate ${displayName.toLowerCase()} needs into work that is both strategic and visually clear.`,
        approach: `Combined concept exploration, hierarchy refinement, and production-ready execution for ${displayName.toLowerCase()}.`,
        outcome: this.categoryOutcomes[key] || 'Delivered polished assets tailored to business goals and audience context.'
      }
    };
  }

  private toGalleryItem(node: PortfolioNode): GalleryItem {
    if (node.type === 'folder') {
      const thumbnail = node.coverUrl || this.findFirstImageUrl(node) || '/assets/our%20logo/black.png';
      return {
        name: this.toDisplayName(node.name),
        path: node.path,
        isFolder: true,
        thumbnail
      };
    }

    return {
      name: this.formatDesignName(node.name),
      path: node.url || `/assets/${node.path}`,
      isFolder: false
    };
  }

  private findFolder(root: PortfolioNode, segments: string[]): PortfolioNode | null {
    let current: PortfolioNode | null = root;

    for (const segment of segments) {
      const children: PortfolioNode[] = current?.children ?? [];
      current =
        children.find(
          (child: PortfolioNode) =>
            child.type === 'folder' && child.name.toLowerCase() === segment.toLowerCase()
        ) || null;

      if (!current) return null;
    }

    return current;
  }

  private findFirstImageUrl(node: PortfolioNode): string | null {
    const children = node.children || [];

    for (const child of children) {
      if (child.type === 'file' && child.url) {
        return child.url;
      }
    }

    for (const child of children) {
      if (child.type === 'folder') {
        const nested = child.coverUrl || this.findFirstImageUrl(child);
        if (nested) return nested;
      }
    }

    return null;
  }

  private countFiles(node: PortfolioNode): number {
    const children = node.children || [];
    let count = 0;

    for (const child of children) {
      if (child.type === 'file') {
        count += 1;
      } else {
        count += this.countFiles(child);
      }
    }

    return count;
  }

  private stripExtension(fileName: string): string {
    return fileName.replace(/\.[^/.]+$/, '');
  }

  private formatDesignName(fileName: string): string {
    const base = this.stripExtension(fileName)
      .replace(/[_-]+/g, ' ')
      .replace(/\s*\(\d+\)$/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!base) return 'Untitled Design';

    const words = base.split(' ');
    const minorWords = new Set(['and', 'or', 'the', 'a', 'an', 'of', 'for', 'to', 'in', 'on']);

    return words
      .map((word, index) => {
        if (!word) return word;
        const lower = word.toLowerCase();
        if (index > 0 && minorWords.has(lower)) {
          return lower;
        }
        if (/^[A-Z]{2,}$/.test(word)) {
          return word;
        }
        return lower.charAt(0).toUpperCase() + lower.slice(1);
      })
      .join(' ');
  }

  private decodeSegment(segment: string): string {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  }

  private toDisplayName(name: string): string {
    return name
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map((part) => {
        if (!part) return part;
        if (/^[A-Z]{2,}$/.test(part)) {
          return part;
        }
        return part[0].toUpperCase() + part.slice(1).toLowerCase();
      })
      .join(' ');
  }
}
