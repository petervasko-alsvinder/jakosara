import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Features } from './components/features/features';
import { Gallery } from './components/gallery/gallery';
import { Purchase } from './components/purchase/purchase';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Hero, About, Features, Gallery, Purchase, Footer],
  template: `
    <app-hero />
    <app-about />
    <app-features />
    <app-gallery />
    <app-purchase />
    <app-footer />
  `,
  styleUrl: './app.scss'
})
export class App {}
