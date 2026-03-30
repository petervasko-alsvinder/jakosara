import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  template: `
    <section class="gallery">
      <div class="container">
        <div class="badge">Előnézet</div>
        <h2>Pillants bele a naplóba</h2>
        <p class="lead">Gyönyörű oldalak, átgondolt kérdések – nézd meg, mit kapsz!</p>
        <div class="grid">
          @for (img of images; track img.src; let i = $index) {
            <div class="item" [class.featured]="i === 0" (click)="open(img)">
              <img [src]="img.src" [alt]="img.alt" />
              <div class="overlay">
                <span>Nagyítás</span>
              </div>
            </div>
          }
        </div>
      </div>

      @if (activeImg) {
        <div class="lightbox" (click)="close()">
          <div class="lightbox-inner" (click)="$event.stopPropagation()">
            <button class="close-btn" (click)="close()">✕</button>
            <img [src]="activeImg.src" [alt]="activeImg.alt" />
            <p>{{ activeImg.alt }}</p>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .gallery {
      padding: 100px 24px;
      background: #FAF8F4;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: #E2DAF0;
      color: #7A6A8A;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 6px 18px;
      border-radius: 50px;
      margin-bottom: 24px;
    }
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      color: #3D3530;
      margin-bottom: 16px;
    }
    .lead {
      font-size: 1rem;
      color: #6B5F58;
      margin-bottom: 48px;
    }
    .grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      grid-template-rows: 240px 240px;
      gap: 16px;
    }
    .item {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
    }
    .item.featured {
      grid-row: 1 / 3;
    }
    .item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(61,53,48,0);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
    }
    .overlay span {
      color: #fff;
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 1px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .item:hover img { transform: scale(1.05); }
    .item:hover .overlay { background: rgba(61,53,48,0.35); }
    .item:hover .overlay span { opacity: 1; }

    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.75);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .lightbox-inner {
      position: relative;
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      max-width: 800px;
      width: 100%;
      text-align: center;
    }
    .lightbox-inner img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 12px;
    }
    .lightbox-inner p {
      color: #6B5F58;
      font-size: 0.9rem;
    }
    .close-btn {
      position: absolute;
      top: 12px; right: 16px;
      background: none;
      border: none;
      font-size: 1.4rem;
      cursor: pointer;
      color: #3D3530;
    }
    @media (max-width: 768px) {
      .grid {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
      }
      .item.featured { grid-row: auto; }
    }
  `]
})
export class Gallery {
  images = [
    { src: 'cover.jpg', alt: 'Napló borítója' },
    { src: 'pages1.jpg', alt: 'Heti napló oldalak' },
    { src: 'pages2.jpg', alt: 'Gyökerek és hangolódás blokk' },
    { src: 'pages3.jpg', alt: 'Baba névötletek oldal' },
  ];

  activeImg: { src: string; alt: string } | null = null;

  open(img: { src: string; alt: string }) {
    this.activeImg = img;
  }

  close() {
    this.activeImg = null;
  }
}
