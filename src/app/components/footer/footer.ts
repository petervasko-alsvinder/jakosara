import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="brand">
          <p class="logo">Úton az anyaság felé</p>
          <p class="tagline">A terhességed legszebb emléke</p>
        </div>
        <div class="links">
          <a href="#bemutato">A naplóról</a>
          <a href="#vasarlas">Vásárlás</a>
          <a href="mailto:hello&#64;jakosara.hu">Kapcsolat</a>
        </div>
        <div class="copy">
          <p>© {{ year }} Jakosara · Minden jog fenntartva</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #3D3530;
      color: #E8D8CF;
      padding: 60px 24px 40px;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 40px;
      align-items: center;
    }
    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      color: #E8D8CF;
      margin-bottom: 6px;
    }
    .tagline {
      font-size: 0.85rem;
      color: #9B8F88;
    }
    .links {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .links a {
      color: #9B8F88;
      font-size: 0.9rem;
      text-decoration: none;
      transition: color 0.2s;
    }
    .links a:hover { color: #E8D8CF; }
    .copy {
      text-align: right;
    }
    .copy p {
      font-size: 0.8rem;
      color: #6B5F58;
    }
    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 24px;
      }
      .links { align-items: center; }
      .copy { text-align: center; }
    }
  `]
})
export class Footer {
  year = new Date().getFullYear();
}
