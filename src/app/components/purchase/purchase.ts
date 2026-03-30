import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase',
  imports: [],
  template: `
    <section class="purchase" id="vasarlas">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="container">
        <div class="card">
          <div class="tag">Fizikai kismama napló</div>
          <h2>Úton az anyaság felé</h2>
          <p class="subtitle">Spirálkötéses, prémium kismama napló</p>
          <div class="price">
            <span class="amount">3 990 Ft</span>
          </div>
          <ul class="perks">
            <li><span class="icon">📦</span> Ingyenes szállítás Magyarországon</li>
            <li><span class="icon">📖</span> Spirálkötéses, keményfedeles napló</li>
            <li><span class="icon">✏️</span> Prémium minőségű, tintaálló papír</li>
            <li><span class="icon">🎁</span> Ajándékcsomagolásban érkezik</li>
          </ul>
          <a href="#" class="btn" (click)="buy($event)">Megrendelem – 3 990 Ft</a>
          <p class="note">Biztonságos fizetés · 3–5 munkanap szállítás</p>
        </div>
        <div class="info">
          <h3>Miért éri meg?</h3>
          <p>
            Terhességed egy egyszer megélhető csoda. Az "Úton az anyaság felé" napló segít, hogy
            minden apró pillanatot megörökíts – a babával kapcsolatos első gondolatoktól egészen
            a születés várakozásteljes perceig.
          </p>
          <p>
            32 hét, 32 lehetőség, hogy valami olyat hozz létre, amit majd egyszer megmutathatsz
            a gyermekednek.
          </p>
          <div class="guarantee">
            <span class="guarantee-icon">🌸</span>
            <div>
              <strong>Elégedettségi garancia</strong>
              <p>Ha bármilyen kérdésed van, írj nekünk és segítünk!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .purchase {
      position: relative;
      padding: 100px 24px;
      background: linear-gradient(135deg, #fce0d0 0%, #e0d0fc 100%);
      overflow: hidden;
    }
    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
    }
    .blob-1 {
      width: 400px; height: 400px;
      background: #8A65CC;
      top: -100px; left: -80px;
      opacity: 0.3;
    }
    .blob-2 {
      width: 350px; height: 350px;
      background: #D4563C;
      bottom: -80px; right: -60px;
      opacity: 0.2;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      position: relative;
      z-index: 1;
    }
    .card {
      background: #fff;
      border-radius: 24px;
      padding: 48px 40px;
      box-shadow: 0 20px 60px rgba(61,53,48,0.12);
      text-align: center;
    }
    .tag {
      display: inline-block;
      background: #FBCDB8;
      color: #D4563C;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 5px 16px;
      border-radius: 50px;
      margin-bottom: 20px;
    }
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      color: #3D3530;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 0.95rem;
      color: #9B8F88;
      margin-bottom: 28px;
    }
    .price {
      margin-bottom: 28px;
    }
    .amount {
      font-size: 3rem;
      font-weight: 700;
      color: #D4563C;
      font-family: 'Playfair Display', serif;
    }
    .perks {
      list-style: none;
      text-align: left;
      margin-bottom: 32px;
    }
    .perks li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      font-size: 0.95rem;
      color: #6B5F58;
      border-bottom: 1px solid #f0ece8;
    }
    .perks li:last-child { border-bottom: none; }
    .icon { font-size: 1.1rem; }
    .btn {
      display: block;
      width: 100%;
      padding: 16px;
      border-radius: 50px;
      background: #D4563C;
      color: #fff;
      font-family: 'Lato', sans-serif;
      font-size: 1rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.3s ease;
      margin-bottom: 16px;
    }
    .btn:hover {
      background: #B84030;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(212,86,60,0.4);
    }
    .note {
      font-size: 0.8rem;
      color: #9B8F88;
    }
    .info h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      color: #3D3530;
      margin-bottom: 20px;
    }
    .info p {
      font-size: 1rem;
      color: #6B5F58;
      line-height: 1.8;
      margin-bottom: 16px;
    }
    .guarantee {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-top: 32px;
      background: #fff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 20px rgba(61,53,48,0.07);
    }
    .guarantee-icon { font-size: 2rem; }
    .guarantee strong {
      display: block;
      font-size: 1rem;
      color: #3D3530;
      margin-bottom: 4px;
    }
    .guarantee p { margin: 0; font-size: 0.9rem; }
    @media (max-width: 768px) {
      .container { grid-template-columns: 1fr; gap: 40px; }
    }
  `]
})
export class Purchase {
  buy(e: Event) {
    e.preventDefault();
    alert('A vásárlási link hamarosan elérhető lesz!');
  }
}
