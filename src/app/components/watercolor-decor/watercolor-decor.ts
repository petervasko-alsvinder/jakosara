import { Component } from '@angular/core';

/**
 * Oldal-szintű vízfesték dekoráció.
 * SVG feTurbulence + feDisplacementMap filterekkel organikus, festett széleket hoz létre.
 * Pozíció: absolute, a teljes oldal mögött – minden szekción átlátszik.
 */
@Component({
  selector: 'app-watercolor-decor',
  imports: [],
  template: `
    <div class="wc-wrap" aria-hidden="true">
      <svg class="wc-svg" viewBox="0 0 1440 5200" preserveAspectRatio="xMidYMin slice"
           xmlns="http://www.w3.org/2000/svg">
        <defs>

          <!--
            NAPLÓ-HŰSÉG:
              #C9968A  meleg dusty rose/mauve  – az oldalak nagy amoeba foltjai
              #C8A865  meleg homokos arany     – fejléc felhő-foltok
              #96B095  tompított zsálya        – sarok-mosások

            FORMÁK:
              #ba  – vízszintes vese/amoeba (oldalak2 nagy foltjai)
              #bk  – sarok-kifolyásos folt (oldalak3 zsálya sarok)
              #bh  – felhő-szerű kis accent (oldalak1 fejléc)
          -->

          <!-- BA – vízszintes vese/amoeba, a napló legjellemzőbb foltja.
               Bal oldala elvékonyodik (farok), jobb oldala kiszélesedik.
               Belső réteg: koncentráltabb, sötétebb mag.
               Természetes méret: ~560 × 235 -->
          <symbol id="ba" viewBox="15 30 560 240" overflow="visible">
            <path opacity="1"
              d="M 78 88
                 C 52  65,  22  92,  28 135
                 C 34 178,  75 205, 135 218
                 C 195 231, 278 228, 355 215
                 C 432 202, 505 180, 542 148
                 C 579 116, 572  78, 542  55
                 C 512  32, 465  28, 415  38
                 C 365  48, 318  62, 265  57
                 C 212  52, 165  42, 128  55
                 C 102  63,  96  102,  78  88 Z"/>
            <path opacity="0.52"
              d="M 95 108
                 C 72  88,  48 112,  55 150
                 C 62 188,  98 212, 152 222
                 C 206 232, 282 228, 352 215
                 C 422 202, 488 182, 522 152
                 C 548 128, 540  95, 515  75
                 C 490  55, 448  52, 402  62
                 C 356  72, 312  85, 262  80
                 C 212  75, 168  65, 135  78
                 C 112  88, 108 120,  95 108 Z"/>
          </symbol>

          <!-- BK – sarokból kifolyó mosás, aszimmetrikus, egyik sarka elvékonyodik.
               Természetes méret: ~385 × 295 -->
          <symbol id="bk" viewBox="8 0 392 302" overflow="visible">
            <path opacity="1"
              d="M 22 20
                 C 85   2, 195   8, 272  48
                 C 349  88, 388 145, 372 202
                 C 356 259, 295 292, 228 295
                 C 161 298,  95 272,  55 228
                 C 15  184,  10 128,  22  80
                 C 30   48,  20  32,  22  20 Z"/>
            <path opacity="0.52"
              d="M 40 42
                 C 95  26, 192  32, 262  68
                 C 332 104, 365 158, 350 208
                 C 335 258, 280 285, 220 285
                 C 160 285, 102 262,  68 222
                 C 34  182,  32 132,  42  92
                 C 50   62,  40  52,  40  42 Z"/>
          </symbol>

          <!-- BH – puha felhő-szerű folt, oldalak1 fejléc stílusában.
               Természetes méret: ~210 × 175 -->
          <symbol id="bh" viewBox="18 12 215 178" overflow="visible">
            <path opacity="1"
              d="M 55  30
                 C 85  12, 132  15, 168  40
                 C 204  65, 215 108, 200 142
                 C 185 176, 150 192, 112 186
                 C 74  180,  42 160,  28 128
                 C 14   96,  22  58,  55  38
                 C 56   34,  54  32,  55  30 Z"/>
            <path opacity="0.52"
              d="M 68  50
                 C 95  35, 132  38, 160  62
                 C 188  86, 196 122, 182 152
                 C 168 182, 138 195, 108 188
                 C 78  181,  52 162,  40 135
                 C 28  108,  36  75,  62  56
                 C 65   52,  66  50,  68  50 Z"/>
          </symbol>

          <!-- WATERCOLOR FILTEREK -->
          <!-- A – nagy foltokhoz, erős torzítás -->
          <filter id="wc-a" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.014 0.020"
                          numOctaves="6" seed="4" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="72"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="5"/>
          </filter>
          <!-- B – sarok-mosásokhoz -->
          <filter id="wc-b" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.020 0.015"
                          numOctaves="5" seed="11" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="58"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="5.5"/>
          </filter>
          <!-- C – kisebb accent foltokhoz -->
          <filter id="wc-c" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.026 0.018"
                          numOctaves="4" seed="17" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="48"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="4"/>
          </filter>
          <!-- D – zsálya sarokfoltokhoz, szétterülős -->
          <filter id="wc-d" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.016 0.024"
                          numOctaves="5" seed="29" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="62"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="6.5"/>
          </filter>
        </defs>

        <!-- ════════════════════════════════════════════
             HERO  (y ≈ 0–780)
             Nagy rose amoeba jobb oldalt + zsálya sarok bal alul + arany fejléc accent
             ════════════════════════════════════════════ -->

        <!-- Dusty rose vízszintes amoeba – jobb felső, domináns -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.55">
          <use href="#ba" x="620"  y="30"   width="870" height="365"/>
          <use href="#ba" x="680"  y="120"  width="680" height="285" opacity="0.55"/>
        </g>

        <!-- Zsálya sarok – bal alsó -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.48">
          <use href="#bk" x="-80"  y="480"  width="680" height="520"/>
          <use href="#bk" x="-30"  y="540"  width="480" height="368" opacity="0.55"/>
        </g>

        <!-- Homokos arany felhő – bal felső accent -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.42">
          <use href="#bh" x="20"   y="25"   width="420" height="352"/>
          <use href="#bh" x="55"   y="55"   width="295" height="247" opacity="0.55"/>
        </g>

        <!-- Rose echo – jobb alsó -->
        <g filter="url(#wc-c)" fill="#C9968A" opacity="0.28">
          <use href="#bh" x="1180" y="620"  width="320" height="268"/>
        </g>


        <!-- ════════════════════════════════════════════
             BEMUTATÓ  (y ≈ 780–1560)
             ════════════════════════════════════════════ -->

        <!-- Rose amoeba – jobb oldal -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.38">
          <use href="#ba" x="760"  y="850"  width="780" height="327"/>
          <use href="#ba" x="820"  y="945"  width="580" height="244" opacity="0.55"/>
        </g>

        <!-- Zsálya sarok – bal oldal -->
        <g filter="url(#wc-d)" fill="#96B095" opacity="0.35">
          <use href="#bk" x="-100" y="980"  width="620" height="474"/>
        </g>

        <!-- Arany felhő – szekció alján közép -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.28">
          <use href="#ba" x="280"  y="1420" width="820" height="344"/>
        </g>


        <!-- ════════════════════════════════════════════
             MIT TARTALMAZ  (y ≈ 1560–2340)
             ════════════════════════════════════════════ -->

        <!-- Zsálya – bal felső sarok -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.40">
          <use href="#bk" x="-90"  y="1580" width="660" height="505"/>
          <use href="#bk" x="-30"  y="1650" width="460" height="352" opacity="0.55"/>
        </g>

        <!-- Rose amoeba – jobb oldal -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.35">
          <use href="#ba" x="740"  y="1900" width="790" height="332"/>
          <use href="#ba" x="820"  y="1985" width="590" height="248" opacity="0.52"/>
        </g>

        <!-- Arany accent – alsó közép -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.25">
          <use href="#bh" x="480"  y="2230" width="450" height="377"/>
        </g>


        <!-- ════════════════════════════════════════════
             GALÉRIA  (y ≈ 2340–3120)
             ════════════════════════════════════════════ -->

        <!-- Arany vízszintes sweep – felső -->
        <g filter="url(#wc-a)" fill="#C8A865" opacity="0.32">
          <use href="#ba" x="80"   y="2360" width="1100" height="462"/>
        </g>

        <!-- Zsálya – jobb alsó sarok -->
        <g filter="url(#wc-d)" fill="#96B095" opacity="0.32">
          <use href="#bk" x="1100" y="2820" width="480" height="368"
               transform="scale(-1,1) translate(-2060,0)"/>
        </g>

        <!-- Rose – bal alsó -->
        <g filter="url(#wc-c)" fill="#C9968A" opacity="0.28">
          <use href="#bk" x="-60"  y="2900" width="520" height="398"/>
        </g>


        <!-- ════════════════════════════════════════════
             VÁSÁRLÁS  (y ≈ 3120–3900)
             ════════════════════════════════════════════ -->

        <!-- Zsálya sarok – bal -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.42">
          <use href="#bk" x="-100" y="3140" width="720" height="551"/>
          <use href="#bk" x="-40"  y="3220" width="510" height="390" opacity="0.55"/>
        </g>

        <!-- Rose amoeba – jobb oldal -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.45">
          <use href="#ba" x="580"  y="3320" width="920" height="386"/>
          <use href="#ba" x="650"  y="3420" width="700" height="294" opacity="0.55"/>
        </g>

        <!-- Arany felhő alap -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.28">
          <use href="#ba" x="200"  y="3720" width="960" height="403"/>
        </g>


        <!-- ════════════════════════════════════════════
             FOOTER  (y ≈ 3900–)
             ════════════════════════════════════════════ -->

        <g filter="url(#wc-d)" fill="#C9968A" opacity="0.18">
          <use href="#ba" x="100"  y="3930" width="1100" height="462"/>
        </g>

      </svg>
    </div>
  `,
  styles: [`
    .wc-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .wc-svg {
      width: 100%;
      height: 100%;
    }
  `]
})
export class WatercolorDecor {}
