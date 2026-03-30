import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Features } from './components/features/features';
import { Gallery } from './components/gallery/gallery';
import { Purchase } from './components/purchase/purchase';
import { Footer } from './components/footer/footer';
import { WatercolorDecor } from './components/watercolor-decor/watercolor-decor';

@Component({
  selector: 'app-root',
  imports: [Hero, About, Features, Gallery, Purchase, Footer, WatercolorDecor],
  template: `
    <div class="page-wrap">
      <app-watercolor-decor />
      <div class="page-content">
        <app-hero />
        <app-about />
        <app-features />
        <app-gallery />
        <app-purchase />
        <app-footer />
      </div>
    </div>
  `,
  styles: [`
    .page-wrap {
      position: relative;
    }
    .page-content {
      position: relative;
      z-index: 1;
    }
  `],
  styleUrl: './app.scss'
})
export class App {}
