import { PlatformLocation } from '@angular/common';
import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private dom: Document,
    private platformLocation: PlatformLocation
  ) {}

  setCanonicalURL(path?: string) {
    const baseUrl = environment.host;
    // Remove existing canonical tag if it exists
    const existingCanonical = this.dom.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Create or update canonical URL
    const canonicalUrl = path
      ? `${baseUrl}${path}`
      : `${baseUrl}${this.platformLocation.pathname}`;

    // Create new canonical link element
    const link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canonicalUrl);

    // Append to head
    this.dom.head.appendChild(link);
  }

  // Optional: Method to update page title
  setTitle(title?: string) {
    if (!title) {
      title = environment.appname;
    } else {
      title = `${title} - ${environment.appname}`;
    }
    this.title.setTitle(title);
  }
}
