import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template: `
    <section class="about" id="bemutato">
      <div class="container">
        <div class="badge">A naplóról</div>
        <h2>Egy különleges utazás<br><em>32 héten át</em></h2>
        <p class="lead">
          Az "Úton az anyaság felé" napló nem csupán egy füzet – hanem egy mély, kreatív önismereti utazás,
          amely végigkísér a fogantatástól egészen a baba megszületéséig.
        </p>
        <div class="cards">
          <div class="card">
            <div class="icon">📖</div>
            <h3>Hetente strukturált</h3>
            <p>Minden hétre saját oldalak, kérdések és feladatok várnak, hogy semmi ne maradjon ki a naplódból.</p>
          </div>
          <div class="card">
            <div class="icon">✨</div>
            <h3>Kreatív önkifejezés</h3>
            <p>Rajzolj, írj, ragassz be emlékeket – a napló teret ad a te egyéni stílusodnak.</p>
          </div>
          <div class="card">
            <div class="icon">💛</div>
            <h3>Örök emlék</h3>
            <p>Egy gyönyörű fizikai napló, amit egész életed megőrizhetsz – és majd egyszer a gyermekednek is megmutathatsz.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      padding: 100px 24px;
      background: #FAF8F4;
      text-align: center;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    .badge {
      display: inline-block;
      background: #FBCDB8;
      color: #D4563C;
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
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      color: #3D3530;
      margin-bottom: 24px;
      line-height: 1.3;
    }
    h2 em {
      color: #D4563C;
      font-style: italic;
    }
    .lead {
      font-size: 1.1rem;
      color: #6B5F58;
      max-width: 640px;
      margin: 0 auto 60px;
      line-height: 1.8;
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .card {
      background: #fff;
      border-radius: 20px;
      padding: 36px 28px;
      box-shadow: 0 4px 24px rgba(61,53,48,0.07);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 40px rgba(61,53,48,0.12);
    }
    .icon {
      font-size: 2.2rem;
      margin-bottom: 16px;
    }
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem;
      color: #3D3530;
      margin-bottom: 12px;
    }
    p {
      font-size: 0.95rem;
      color: #6B5F58;
      line-height: 1.7;
    }
    @media (max-width: 768px) {
      .cards { grid-template-columns: 1fr; }
    }
  `]
})
export class About {}
