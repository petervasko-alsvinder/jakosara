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
            Minden path natív SVG koordinátában van, translate() transformokkal pozícionálva.
            Nincs symbol/use skálázás – amit leírsz, az jelenik meg.

            Formák:
              amoeba  – 1300×355px vízszintes vese, a napló fő foltjának másolata
              corner  – 870×430px sarokból kifolyó mosás
              cloud   – 415×335px puha felhő

            Napló-hű színek:
              #C9968A  dusty rose/mauve   (oldalak2 nagy foltjai)
              #C8A865  homokos arany      (oldalak1 fejléc foltok)
              #96B095  tompított zsálya   (oldalak3 sarok mosások)
          -->

          <!-- FILTEREK – natív koordináta-mérethez hangolva -->
          <!-- A – nagy amoeba foltokhoz -->
          <filter id="wc-a" x="-25%" y="-40%" width="150%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.004 0.006"
                          numOctaves="5" seed="4" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="88"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="3"/>
          </filter>
          <!-- B – sarok-mosásokhoz -->
          <filter id="wc-b" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence type="fractalNoise" baseFrequency="0.005 0.004"
                          numOctaves="5" seed="11" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="75"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="4"/>
          </filter>
          <!-- C – felhő accent-ekhez -->
          <filter id="wc-c" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.007 0.005"
                          numOctaves="4" seed="17" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="60"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="3.5"/>
          </filter>
        </defs>

        <!--
          ═══════ KÖZÖS FORMAKÖNYVTÁR (inline path-ok) ═══════

          AMOEBA alap (helyi 0,0 origin, 1300×355px):
            Külső: M 145 35 C ... Z
            Belső: M 168 60 C ... Z

          CORNER alap (helyi 0,0 origin, 870×430px):
            Külső: M 50 48 C ... Z
            Belső: M 72 75 C ... Z

          CLOUD alap (helyi 0,0 origin, 415×335px):
            Külső: M 55 32 C ... Z
            Belső: M 78 58 C ... Z

          Pozícionálás: <g transform="translate(X, Y)"> wrapper
          Tükrözés (jobb oldali sarokhoz): <g transform="translate(1440, Y) scale(-1,1)">
        -->

        <!-- ════════════════════════════════
             HERO  (y 0–780)
             ════════════════════════════════ -->

        <!-- BAL FELSŐ SAROK – zsálya corner, oldalon kívülről indul -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.68" transform="translate(-120, -140)">
          <path d="M 50 48 C 2 102 -6 178 28 250 C 62 322 150 372 264 398
                   C 378 424 515 422 626 395 C 737 368 828 318 842 258
                   C 856 198 820 128 760 86 C 700 44 608 26 506 20
                   C 404 14 295 24 198 38 C 118 48 62 22 50 48 Z"/>
          <path opacity="0.50"
                d="M 72 75 C 28 125 20 195 52 262 C 84 329 168 375 278 398
                   C 388 421 518 418 625 393 C 732 368 818 320 830 263
                   C 842 206 808 140 750 100 C 692 60 605 44 506 39
                   C 407 34 304 44 212 57 C 138 67 82 48 72 75 Z"/>
        </g>

        <!-- BAL FELSŐ – arany felhő, felülről lóg be -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.62" transform="translate(-60, -90)">
          <path d="M 55 32 C 106 5 208 11 286 56 C 364 101 408 172 390 238
                   C 372 304 316 342 246 344 C 176 346 102 320 55 270
                   C 8 220 -6 155 16 98 C 30 58 22 46 55 32 Z"/>
          <path opacity="0.50"
                d="M 78 58 C 124 34 218 40 290 82 C 362 124 400 190 383 250
                   C 366 310 314 342 250 343 C 186 344 118 319 75 274
                   C 32 229 20 172 40 120 C 54 80 46 68 78 58 Z"/>
        </g>

        <!-- Rose amoeba – felső széléről indul be, enyhén negatív y -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.65" transform="translate(-80, -60)">
          <path d="M 145 35 C 280 7 475 0 665 25 C 855 50 1020 73 1178 62
                   C 1278 54 1326 93 1318 145 C 1310 197 1256 237 1176 257
                   C 1096 277 988 267 876 281 C 764 295 656 320 538 337
                   C 420 354 303 359 205 331 C 108 303 38 260 22 209
                   C 6 158 46 105 104 73 C 132 55 140 47 145 35 Z"/>
          <path opacity="0.50"
                d="M 168 60 C 298 35 488 28 672 52 C 856 76 1018 98 1165 88
                   C 1260 82 1300 118 1292 167 C 1284 216 1234 252 1158 270
                   C 1082 288 978 280 868 293 C 758 306 652 329 538 344
                   C 424 359 312 362 218 337 C 124 312 60 272 45 224
                   C 30 176 68 126 122 96 C 148 78 156 68 168 60 Z"/>
        </g>

        <!-- Zsálya echo – jobb oldali szélről, hero közepe -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.45" transform="translate(1475, 340) scale(-1,1)">
          <path d="M 50 48 C 2 102 -6 178 28 250 C 62 322 150 372 264 398
                   C 378 424 515 422 626 395 C 737 368 828 318 842 258
                   C 856 198 820 128 760 86 C 700 44 608 26 506 20
                   C 404 14 295 24 198 38 C 118 48 62 22 50 48 Z"/>
        </g>

        <!-- Rose echo – jobb felső sarokból -->
        <g filter="url(#wc-c)" fill="#C9968A" opacity="0.40" transform="translate(1500, -80) scale(-1,1)">
          <path d="M 55 32 C 106 5 208 11 286 56 C 364 101 408 172 390 238
                   C 372 304 316 342 246 344 C 176 346 102 320 55 270
                   C 8 220 -6 155 16 98 C 30 58 22 46 55 32 Z"/>
        </g>


        <!-- ════════════════════════════════
             BEMUTATÓ  (y 780–1560)
             ════════════════════════════════ -->

        <!-- Rose amoeba – tükrözve, jobb oldal -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.58" transform="translate(1345, 835) scale(-1,1)">
          <path d="M 145 35 C 280 7 475 0 665 25 C 855 50 1020 73 1178 62
                   C 1278 54 1326 93 1318 145 C 1310 197 1256 237 1176 257
                   C 1096 277 988 267 876 281 C 764 295 656 320 538 337
                   C 420 354 303 359 205 331 C 108 303 38 260 22 209
                   C 6 158 46 105 104 73 C 132 55 140 47 145 35 Z"/>
          <path opacity="0.50"
                d="M 168 60 C 298 35 488 28 672 52 C 856 76 1018 98 1165 88
                   C 1260 82 1300 118 1292 167 C 1284 216 1234 252 1158 270
                   C 1082 288 978 280 868 293 C 758 306 652 329 538 344
                   C 424 359 312 362 218 337 C 124 312 60 272 45 224
                   C 30 176 68 126 122 96 C 148 78 156 68 168 60 Z"/>
        </g>

        <!-- Zsálya sarok – bal, oldalon kívülről -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.52" transform="translate(-120, 1060)">
          <path d="M 50 48 C 2 102 -6 178 28 250 C 62 322 150 372 264 398
                   C 378 424 515 422 626 395 C 737 368 828 318 842 258
                   C 856 198 820 128 760 86 C 700 44 608 26 506 20
                   C 404 14 295 24 198 38 C 118 48 62 22 50 48 Z"/>
        </g>

        <!-- Arany felhő – jobb -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.45" transform="translate(1008, 838)">
          <path d="M 55 32 C 106 5 208 11 286 56 C 364 101 408 172 390 238
                   C 372 304 316 342 246 344 C 176 346 102 320 55 270
                   C 8 220 -6 155 16 98 C 30 58 22 46 55 32 Z"/>
        </g>

        <!-- Arany sweep – szekció alján -->
        <g filter="url(#wc-a)" fill="#C8A865" opacity="0.35" transform="translate(68, 1398)">
          <path d="M 145 35 C 280 7 475 0 665 25 C 855 50 1020 73 1178 62
                   C 1278 54 1326 93 1318 145 C 1310 197 1256 237 1176 257
                   C 1096 277 988 267 876 281 C 764 295 656 320 538 337
                   C 420 354 303 359 205 331 C 108 303 38 260 22 209
                   C 6 158 46 105 104 73 C 132 55 140 47 145 35 Z"/>
        </g>


        <!-- ════════════════════════════════
             MIT TARTALMAZ  (y 1560–2340)
             ════════════════════════════════ -->

        <!-- Zsálya sarok – bal, nagy, oldalon kívülről -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.60" transform="translate(-120, 1545)">
          <path d="M 50 48 C 2 102 -6 178 28 250 C 62 322 150 372 264 398
                   C 378 424 515 422 626 395 C 737 368 828 318 842 258
                   C 856 198 820 128 760 86 C 700 44 608 26 506 20
                   C 404 14 295 24 198 38 C 118 48 62 22 50 48 Z"/>
          <path opacity="0.50"
                d="M 72 75 C 28 125 20 195 52 262 C 84 329 168 375 278 398
                   C 388 421 518 418 625 393 C 732 368 818 320 830 263
                   C 842 206 808 140 750 100 C 692 60 605 44 506 39
                   C 407 34 304 44 212 57 C 138 67 82 48 72 75 Z"/>
        </g>

        <!-- Rose amoeba – jobb, nagy -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.58" transform="translate(95, 1940)">
          <path d="M 145 35 C 280 7 475 0 665 25 C 855 50 1020 73 1178 62
                   C 1278 54 1326 93 1318 145 C 1310 197 1256 237 1176 257
                   C 1096 277 988 267 876 281 C 764 295 656 320 538 337
                   C 420 354 303 359 205 331 C 108 303 38 260 22 209
                   C 6 158 46 105 104 73 C 132 55 140 47 145 35 Z"/>
          <path opacity="0.50"
                d="M 168 60 C 298 35 488 28 672 52 C 856 76 1018 98 1165 88
                   C 1260 82 1300 118 1292 167 C 1284 216 1234 252 1158 270
                   C 1082 288 978 280 868 293 C 758 306 652 329 538 344
                   C 424 359 312 362 218 337 C 124 312 60 272 45 224
                   C 30 176 68 126 122 96 C 148 78 156 68 168 60 Z"/>
        </g>

        <!-- Arany accent közép -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.38" transform="translate(510, 2248)">
          <path d="M 55 32 C 106 5 208 11 286 56 C 364 101 408 172 390 238
                   C 372 304 316 342 246 344 C 176 346 102 320 55 270
                   C 8 220 -6 155 16 98 C 30 58 22 46 55 32 Z"/>
        </g>


        <!-- ════════════════════════════════
             GALÉRIA  (y 2340–3120)
             ════════════════════════════════ -->

        <!-- Arany amoeba – teljes szélességű sweep -->
        <g filter="url(#wc-a)" fill="#C8A865" opacity="0.52" transform="translate(58, 2362)">
          <path d="M 145 35 C 280 7 475 0 665 25 C 855 50 1020 73 1178 62
                   C 1278 54 1326 93 1318 145 C 1310 197 1256 237 1176 257
                   C 1096 277 988 267 876 281 C 764 295 656 320 538 337
                   C 420 354 303 359 205 331 C 108 303 38 260 22 209
                   C 6 158 46 105 104 73 C 132 55 140 47 145 35 Z"/>
          <path opacity="0.50"
                d="M 168 60 C 298 35 488 28 672 52 C 856 76 1018 98 1165 88
                   C 1260 82 1300 118 1292 167 C 1284 216 1234 252 1158 270
                   C 1082 288 978 280 868 293 C 758 306 652 329 538 344
                   C 424 359 312 362 218 337 C 124 312 60 272 45 224
                   C 30 176 68 126 122 96 C 148 78 156 68 168 60 Z"/>
        </g>

        <!-- Zsálya – jobb sarok -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.50" transform="translate(1475, 2778) scale(-1,1)">
          <path d="M 50 48 C 2 102 -6 178 28 250 C 62 322 150 372 264 398
                   C 378 424 515 422 626 395 C 737 368 828 318 842 258
                   C 856 198 820 128 760 86 C 700 44 608 26 506 20
                   C 404 14 295 24 198 38 C 118 48 62 22 50 48 Z"/>
        </g>

        <!-- Rose sarok – bal alsó, oldalon kívülről -->
        <g filter="url(#wc-c)" fill="#C9968A" opacity="0.42" transform="translate(-100, 2850)">
          <path d="M 50 48 C 2 102 -6 178 28 250 C 62 322 150 372 264 398
                   C 378 424 515 422 626 395 C 737 368 828 318 842 258
                   C 856 198 820 128 760 86 C 700 44 608 26 506 20
                   C 404 14 295 24 198 38 C 118 48 62 22 50 48 Z"/>
        </g>


        <!-- ════════════════════════════════
             VÁSÁRLÁS  (y 3120–3900)
             ════════════════════════════════ -->

        <!-- Zsálya sarok – bal, nagy, oldalon kívülről -->
        <g filter="url(#wc-b)" fill="#96B095" opacity="0.62" transform="translate(-120, 3105)">
          <path d="M 50 48 C 2 102 -6 178 28 250 C 62 322 150 372 264 398
                   C 378 424 515 422 626 395 C 737 368 828 318 842 258
                   C 856 198 820 128 760 86 C 700 44 608 26 506 20
                   C 404 14 295 24 198 38 C 118 48 62 22 50 48 Z"/>
          <path opacity="0.50"
                d="M 72 75 C 28 125 20 195 52 262 C 84 329 168 375 278 398
                   C 388 421 518 418 625 393 C 732 368 818 320 830 263
                   C 842 206 808 140 750 100 C 692 60 605 44 506 39
                   C 407 34 304 44 212 57 C 138 67 82 48 72 75 Z"/>
        </g>

        <!-- Rose amoeba – tükrözve, jobb oldal -->
        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.65" transform="translate(1345, 3335) scale(-1,1)">
          <path d="M 145 35 C 280 7 475 0 665 25 C 855 50 1020 73 1178 62
                   C 1278 54 1326 93 1318 145 C 1310 197 1256 237 1176 257
                   C 1096 277 988 267 876 281 C 764 295 656 320 538 337
                   C 420 354 303 359 205 331 C 108 303 38 260 22 209
                   C 6 158 46 105 104 73 C 132 55 140 47 145 35 Z"/>
          <path opacity="0.50"
                d="M 168 60 C 298 35 488 28 672 52 C 856 76 1018 98 1165 88
                   C 1260 82 1300 118 1292 167 C 1284 216 1234 252 1158 270
                   C 1082 288 978 280 868 293 C 758 306 652 329 538 344
                   C 424 359 312 362 218 337 C 124 312 60 272 45 224
                   C 30 176 68 126 122 96 C 148 78 156 68 168 60 Z"/>
        </g>

        <!-- Arany felhő – közép-alap -->
        <g filter="url(#wc-c)" fill="#C8A865" opacity="0.42" transform="translate(518, 3722)">
          <path d="M 55 32 C 106 5 208 11 286 56 C 364 101 408 172 390 238
                   C 372 304 316 342 246 344 C 176 346 102 320 55 270
                   C 8 220 -6 155 16 98 C 30 58 22 46 55 32 Z"/>
          <path opacity="0.50"
                d="M 78 58 C 124 34 218 40 290 82 C 362 124 400 190 383 250
                   C 366 310 314 342 250 343 C 186 344 118 319 75 274
                   C 32 229 20 172 40 120 C 54 80 46 68 78 58 Z"/>
        </g>


        <!-- ════════════════════════════════
             FOOTER  (y 3900–)
             ════════════════════════════════ -->

        <g filter="url(#wc-a)" fill="#C9968A" opacity="0.38" transform="translate(58, 3928)">
          <path d="M 145 35 C 280 7 475 0 665 25 C 855 50 1020 73 1178 62
                   C 1278 54 1326 93 1318 145 C 1310 197 1256 237 1176 257
                   C 1096 277 988 267 876 281 C 764 295 656 320 538 337
                   C 420 354 303 359 205 331 C 108 303 38 260 22 209
                   C 6 158 46 105 104 73 C 132 55 140 47 145 35 Z"/>
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
    }
    .wc-svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
  `]
})
export class WatercolorDecor {}
