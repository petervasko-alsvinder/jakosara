import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  imports: [],
  template: `
    <section class="features">
      <div class="container">
        <div class="text-col">
          <div class="badge">Mit tartalmaz?</div>
          <h2>Minden, amire szükséged van az úton</h2>
          <ul class="list">
            @for (item of items; track item) {
              <li>
                <span class="check">✓</span>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
          <a href="#vasarlas" class="btn">Megrendelem most</a>
        </div>
        <div class="image-col">
          <div class="img-stack">
            <img class="img-back" src="pages2.jpg" alt="Napló belső oldalai" />
            <img class="img-front" src="pages1.jpg" alt="Napló hetenkénti oldalak" />
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .features {
      padding: 100px 24px;
      background: rgba(250,248,244,0.65);
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }
    .badge {
      display: inline-block;
      background: #B8E0B0;
      color: #2E8020;
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
      font-size: clamp(1.6rem, 3.5vw, 2.4rem);
      color: #3D3530;
      margin-bottom: 32px;
      line-height: 1.3;
    }
    .list {
      list-style: none;
      margin-bottom: 40px;
    }
    .list li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 14px;
      font-size: 1rem;
      color: #6B5F58;
      line-height: 1.6;
    }
    .check {
      color: #5EA855;
      font-weight: 700;
      font-size: 1.1rem;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .btn {
      display: inline-block;
      padding: 14px 32px;
      border-radius: 50px;
      background: #D4563C;
      color: #fff;
      font-family: 'Lato', sans-serif;
      font-size: 0.95rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s ease;
      border: 2px solid #D4563C;
    }
    .btn:hover {
      background: #B84030;
      border-color: #B84030;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,86,60,0.35);
    }
    .img-stack {
      position: relative;
      height: 400px;
    }
    .img-back {
      position: absolute;
      top: 0; right: 0;
      width: 80%;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(61,53,48,0.15);
    }
    .img-front {
      position: absolute;
      bottom: 0; left: 0;
      width: 70%;
      border-radius: 16px;
      box-shadow: 0 16px 48px rgba(61,53,48,0.2);
      border: 6px solid #FAF8F4;
    }
    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; gap: 40px; }
      .img-stack { height: 280px; }
    }
  `]
})
export class Features {
  items = [
    '32 hetes heti napló struktúra fogantatástól a születésig',
    'Kreatív kérdések és feladatok minden hétre',
    'Baba fejlődésének nyomon követése hétről hétre',
    'Terhesgondozói látogatások és vizsgálatok feljegyzése',
    'Gondolatok, érzések, félelmek és örömök megörökítése',
    'Névötletek oldal – fiú és lány nevek',
    'Egyedi, watercolor illusztrációkkal díszített oldalak',
    'Prémium minőségű papír, spirálkötéses kivitel',
  ];
}
