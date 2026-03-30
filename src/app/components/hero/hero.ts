import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  template: `
    <section class="hero">
      <div class="container">
        <div class="text">
          <p class="pre-title">Kismama napló</p>
          <h1>Úton az anyaság felé</h1>
          <p class="subtitle"><em>32 hetes kreatív utazás a fogantatástól a megszületésig</em></p>
          <p class="desc">
            Örökítsd meg terhességed minden pillanatát egy gyönyörű, kidolgozott naplóban.
            Hetente kísér végig az úton – kérdésekkel, feladatokkal és hellyel a legszebb emlékeknek.
          </p>
          <div class="actions">
            <a href="#vasarlas" class="btn btn-primary">Megrendelem most</a>
            <a href="#bemutato" class="btn btn-ghost">Bővebben</a>
          </div>
        </div>
        <div class="image-wrap">
          <img src="cover.jpg" alt="Úton az anyaság felé – kismama napló borítója" />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      background: transparent;
      padding: 90px 24px 120px;
      overflow: hidden;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .pre-title {
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #D4563C;
      font-weight: 700;
      margin-bottom: 16px;
    }
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.2rem, 5vw, 3.5rem);
      color: #3D3530;
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .subtitle {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem;
      color: #6B5F58;
      margin-bottom: 24px;
    }
    .desc {
      font-size: 1rem;
      color: #6B5F58;
      max-width: 480px;
      margin-bottom: 36px;
      line-height: 1.8;
    }
    .actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 14px 32px;
      border-radius: 50px;
      font-family: 'Lato', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      text-decoration: none;
    }
    .btn-primary {
      background: #D4563C;
      color: #fff;
      border-color: #D4563C;
    }
    .btn-primary:hover {
      background: #B84030;
      border-color: #B84030;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,86,60,0.35);
    }
    .btn-ghost {
      background: transparent;
      color: #3D3530;
      border-color: #3D3530;
    }
    .btn-ghost:hover {
      background: #3D3530;
      color: #fff;
      transform: translateY(-2px);
    }
    .image-wrap {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(61,53,48,0.18);
      transform: rotate(2deg);
      transition: transform 0.4s ease;
      max-width: 420px;
      margin: 0 auto;
    }
    .image-wrap:hover {
      transform: rotate(0deg) scale(1.02);
    }
    .image-wrap img { width: 100%; height: auto; }
    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; gap: 40px; text-align: center; }
      .desc { margin: 0 auto 36px; }
      .actions { justify-content: center; }
      .image-wrap { max-width: 300px; }
    }
  `]
})
export class Hero {}
