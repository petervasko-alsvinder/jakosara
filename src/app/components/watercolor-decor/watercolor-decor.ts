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
            BLOB FORMÁK  (symbol + use rendszer)
            Minden symbolban két réteg: egy külső és egy kisebb belső folt,
            ahogy az igazi vízfestékben a festék "pocsékol" és belül sötétebb.

            bl = nagy, szabálytalan (hero főfolt, purchase)
            bm = széles, vízszintes (zsálya-típusú, sávos)
            bs = közepes kerek, aszimmetrikus (accent, echo)
          -->

          <!--
            BLOB FORMÁK – 12-15 szegmenses bezier path-ok,
            szándékos nyúlványokkal, befűzödésekkel, konkáv mélyedésekkel.
            A filterek erre jönnek rá, tehát a végeredmény még szabálytalanabb lesz.
          -->

          <!-- BLOB LARGE: jobb oldalán nyúlvány, bal felső részén konkáv mélyedés -->
          <symbol id="bl" viewBox="30 -10 440 410" overflow="visible">
            <path opacity="1"
              d="M 242 18
                 C 288 4,   348 10,  392 45
                 C 436 80,  452 138, 448 185
                 C 444 232, 428 255, 445 288
                 C 462 321, 468 362, 442 385
                 C 416 408, 372 398, 332 378
                 C 292 358, 262 332, 228 342
                 C 194 352, 172 378, 138 368
                 C 104 358, 72  328, 58  292
                 C 44  256, 48  212, 38  178
                 C 28  144, 32  102, 52  72
                 C 68  48,  88  52,  112 38
                 C 136 24,  148 38,  172 24
                 C 196 10,  218 24,  242 18 Z"/>
            <path opacity="0.48"
              d="M 238 45
                 C 278 32,  332 38,  368 72
                 C 404 106, 415 158, 410 202
                 C 405 246, 388 268, 402 295
                 C 416 322, 422 352, 398 368
                 C 374 384, 338 375, 305 358
                 C 272 341, 248 318, 220 326
                 C 192 334, 172 355, 145 346
                 C 118 337, 92  312, 80  280
                 C 68  248, 72  210, 64  180
                 C 56  150, 60  115, 78  92
                 C 95  72,  115 78,  138 65
                 C 158 54,  168 65,  190 54
                 C 212 42,  225 52,  238 45 Z"/>
          </symbol>

          <!-- BLOB MEDIUM: vízszintes, bal oldalán ujjszerű nyúlvány, jobb oldala tagolt -->
          <symbol id="bm" viewBox="20 5 450 340" overflow="visible">
            <path opacity="1"
              d="M 42 162
                 C 28 118,  32 75,   58 52
                 C 84 29,   118 52,  152 38
                 C 186 24,  208 -2,  248 8
                 C 288 18,  315 52,  358 65
                 C 401 78,  440 72,  458 108
                 C 476 144, 462 195, 445 228
                 C 428 261, 402 272, 418 302
                 C 434 332, 448 358, 425 368
                 C 402 378, 365 358, 328 345
                 C 291 332, 262 328, 228 338
                 C 194 348, 168 355, 135 338
                 C 102 321, 78  292, 58  262
                 C 38  232, 34  195, 28  172
                 C 25  162, 40  168, 42  162 Z"/>
            <path opacity="0.48"
              d="M 65 168
                 C 52 132,  58 98,   80 78
                 C 102 58,  132 78,  162 65
                 C 192 52,  212 28,  248 36
                 C 284 44,  308 75,  348 88
                 C 388 101, 422 95,  438 128
                 C 454 161, 440 205, 425 235
                 C 410 265, 386 275, 400 302
                 C 414 329, 425 348, 405 356
                 C 385 364, 352 348, 318 336
                 C 284 324, 258 322, 228 330
                 C 198 338, 175 345, 148 330
                 C 121 315, 100 288, 82  262
                 C 64  236, 62  205, 58  182
                 C 56  168, 65  170, 65  168 Z"/>
          </symbol>

          <!-- BLOB SMALL: felső részén csipkés, alul kiugró lebeny -->
          <symbol id="bs" viewBox="40 -15 295 305" overflow="visible">
            <path opacity="1"
              d="M 178 12
                 C 212 -2,  258 5,   288 35
                 C 318 65,  328 108, 318 142
                 C 308 176, 288 188, 302 218
                 C 316 248, 338 272, 318 292
                 C 298 312, 258 305, 222 290
                 C 186 275, 162 255, 135 268
                 C 108 281, 82  295, 62  275
                 C 42  255, 45  218, 52  185
                 C 59  152, 68  128, 52  98
                 C 36  68,  38  32,  68  15
                 C 88  4,   108 18,  132 8
                 C 152 0,   162 18,  178 12 Z"/>
            <path opacity="0.48"
              d="M 175 35
                 C 205 22,  245 28,  270 55
                 C 295 82,  302 122, 292 152
                 C 282 182, 265 192, 278 218
                 C 291 244, 310 262, 292 278
                 C 274 294, 240 288, 210 275
                 C 180 262, 158 245, 135 256
                 C 112 267, 90  278, 72  260
                 C 54  242, 58  210, 64  182
                 C 70  154, 78  132, 64  106
                 C 50  80,  54  52,  78  38
                 C 95  28,  112 40,  132 32
                 C 150 24,  158 40,  175 35 Z"/>
          </symbol>

          <!-- WATERCOLOR FILTEREK – magasabb scale = drámaibb torzítás -->
          <!-- A – nagyon erős, hero főfoltokhoz -->
          <filter id="wc-a" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.016 0.022"
                          numOctaves="6" seed="4" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="68"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="5"/>
          </filter>
          <!-- B – közepes-erős, sávos foltokhoz -->
          <filter id="wc-b" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.022 0.016"
                          numOctaves="5" seed="11" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="55"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="4.5"/>
          </filter>
          <!-- C – közepes, kisebb ecsetfoltokhoz -->
          <filter id="wc-c" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.028 0.020"
                          numOctaves="4" seed="17" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="45"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="4"/>
          </filter>
          <!-- D – lassú, széles torzítás, levendula tónushoz -->
          <filter id="wc-d" x="-70%" y="-70%" width="240%" height="240%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.026"
                          numOctaves="5" seed="23" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="58"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="6"/>
          </filter>
        </defs>

        <!-- ═══════════════════════════════════════════
             HERO  (y ≈ 0–780)
             ═══════════════════════════════════════════ -->

        <!-- Korall főfolt – jobb felső, domináns -->
        <g filter="url(#wc-a)" fill="#D4563C" opacity="0.28">
          <use href="#bl" x="855"  y="-25"  width="435" height="382"/>
          <use href="#bs" x="938"  y="55"   width="265" height="233" opacity="0.72"/>
        </g>

        <!-- Zsálya folt – bal alsó -->
        <g filter="url(#wc-b)" fill="#5EA855" opacity="0.26">
          <use href="#bm" x="-45"  y="435"  width="405" height="340"/>
          <use href="#bs" x="15"   y="488"  width="235" height="206" opacity="0.65"/>
        </g>

        <!-- Levendula accent – bal felső -->
        <g filter="url(#wc-d)" fill="#8A65CC" opacity="0.22">
          <use href="#bs" x="28"   y="18"   width="262" height="230"/>
          <use href="#bs" x="55"   y="42"   width="178" height="156" opacity="0.60"/>
        </g>

        <!-- Kis korall echo – jobb alsó sarok -->
        <g filter="url(#wc-c)" fill="#D4563C" opacity="0.15">
          <use href="#bs" x="1238" y="638"  width="212" height="186"/>
        </g>

        <!-- Zsálya echo – felső közép -->
        <g filter="url(#wc-c)" fill="#5EA855" opacity="0.12">
          <use href="#bs" x="655"  y="-18"  width="182" height="160"/>
        </g>


        <!-- ═══════════════════════════════════════════
             BEMUTATÓ  (y ≈ 780–1560)
             ═══════════════════════════════════════════ -->

        <g filter="url(#wc-d)" fill="#8A65CC" opacity="0.13">
          <use href="#bl" x="1178" y="778"  width="312" height="274"/>
        </g>
        <g filter="url(#wc-a)" fill="#D4563C" opacity="0.11">
          <use href="#bl" x="-52"  y="848"  width="302" height="266"/>
        </g>
        <g filter="url(#wc-b)" fill="#5EA855" opacity="0.10">
          <use href="#bm" x="428"  y="1418" width="555" height="465" opacity="0.5"/>
        </g>


        <!-- ═══════════════════════════════════════════
             MIT TARTALMAZ  (y ≈ 1560–2340)
             ═══════════════════════════════════════════ -->

        <g filter="url(#wc-b)" fill="#5EA855" opacity="0.16">
          <use href="#bl" x="-22"  y="1598" width="322" height="283"/>
        </g>
        <g filter="url(#wc-c)" fill="#D4563C" opacity="0.13">
          <use href="#bl" x="1128" y="1798" width="332" height="292"/>
        </g>
        <g filter="url(#wc-d)" fill="#8A65CC" opacity="0.10">
          <use href="#bm" x="438"  y="2228" width="485" height="406"/>
        </g>


        <!-- ═══════════════════════════════════════════
             GALÉRIA  (y ≈ 2340–3120)
             ═══════════════════════════════════════════ -->

        <g filter="url(#wc-d)" fill="#8A65CC" opacity="0.11">
          <use href="#bm" x="328"  y="2338" width="705" height="591"/>
        </g>
        <g filter="url(#wc-a)" fill="#D4563C" opacity="0.12">
          <use href="#bs" x="1228" y="2978" width="242" height="213"/>
        </g>
        <g filter="url(#wc-c)" fill="#5EA855" opacity="0.11">
          <use href="#bs" x="-12"  y="2898" width="222" height="195"/>
        </g>


        <!-- ═══════════════════════════════════════════
             VÁSÁRLÁS  (y ≈ 3120–3900)
             ═══════════════════════════════════════════ -->

        <!-- Levendula – bal oldal -->
        <g filter="url(#wc-d)" fill="#8A65CC" opacity="0.22">
          <use href="#bl" x="28"   y="3178" width="372" height="328"/>
          <use href="#bs" x="78"   y="3238" width="232" height="204" opacity="0.70"/>
        </g>

        <!-- Korall – jobb oldal -->
        <g filter="url(#wc-a)" fill="#D4563C" opacity="0.20">
          <use href="#bl" x="1058" y="3318" width="392" height="346"/>
          <use href="#bs" x="1128" y="3378" width="242" height="213" opacity="0.65"/>
        </g>

        <!-- Zsálya alap -->
        <g filter="url(#wc-b)" fill="#5EA855" opacity="0.12">
          <use href="#bm" x="418"  y="3748" width="482" height="404"/>
        </g>


        <!-- ═══════════════════════════════════════════
             FOOTER (y ≈ 3900–)
             ═══════════════════════════════════════════ -->

        <g filter="url(#wc-c)" fill="#D4563C" opacity="0.08">
          <use href="#bm" x="368"  y="3928" width="645" height="540"/>
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
