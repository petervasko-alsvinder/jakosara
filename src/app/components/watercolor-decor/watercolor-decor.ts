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

          <!-- BLOB LARGE: szabálytalan, bal oldala lapított, jobb oldala kidudorodik -->
          <symbol id="bl" viewBox="45 0 405 355" overflow="visible">
            <path opacity="1"
              d="M 228 15
                 C 282 2,  355 18,  395 68
                 C 435 118, 438 188, 418 240
                 C 398 292, 350 328, 295 338
                 C 240 348, 178 335, 135 302
                 C 92 269,  68 220,  62 170
                 C 56 120,  72 66,   110 40
                 C 128 28,  148 38,  172 26
                 C 195 14,  212 18,  228 15 Z"/>
            <!-- belső nedves réteg -->
            <path opacity="0.5"
              d="M 218 40
                 C 265 26,  328 40,  365 82
                 C 402 124, 404 185, 382 230
                 C 360 275, 315 305, 265 312
                 C 215 319, 160 305, 125 275
                 C 90 245,  75 202,  80 162
                 C 85 122,  108 86,  142 65
                 C 162 52,  186 60,  208 48
                 C 215 44,  216 40,  218 40 Z"/>
          </symbol>

          <!-- BLOB MEDIUM: laposabb, vízszintes irányú, egyik oldala "befűződik" -->
          <symbol id="bm" viewBox="30 15 390 325" overflow="visible">
            <path opacity="1"
              d="M 48 148
                 C 65 85,   118 42,  182 32
                 C 246 22,  322 50,  366 102
                 C 410 154, 412 224, 382 268
                 C 352 312, 295 334, 238 328
                 C 181 322, 125 298, 90 258
                 C 55 218,  38 168,  48 148 Z"/>
            <!-- belső nedves réteg -->
            <path opacity="0.5"
              d="M 72 158
                 C 88 108,  135 72,  192 64
                 C 249 56,  315 80,  350 125
                 C 385 170, 382 232, 355 268
                 C 328 304, 278 318, 230 312
                 C 182 306, 138 285, 108 252
                 C 78 219,  62 178,  72 158 Z"/>
          </symbol>

          <!-- BLOB SMALL: kerek, de aszimmetrikus – bal felső oldala be van nyomva -->
          <symbol id="bs" viewBox="50 -12 290 272" overflow="visible">
            <path opacity="1"
              d="M 175 12
                 C 218 -2,  268 12,  298 50
                 C 328 88,  332 142, 312 182
                 C 292 222, 250 248, 205 250
                 C 160 252, 115 236, 88 202
                 C 61 168,  58 122,  72 88
                 C 86 54,   118 28,  158 15
                 C 164 13,  170 13,  175 12 Z"/>
            <!-- belső nedves réteg -->
            <path opacity="0.5"
              d="M 178 35
                 C 214 22,  258 35,  282 68
                 C 306 101, 305 148, 285 182
                 C 265 216, 228 235, 190 235
                 C 152 235, 115 222, 92 194
                 C 69 166,  68 125,  82 97
                 C 96 69,   125 50,  158 40
                 C 164 38,  172 36,  178 35 Z"/>
          </symbol>

          <!-- WATERCOLOR FILTEREK -->
          <!-- A – erős torzítás, hero főfoltokhoz -->
          <filter id="wc-a" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.025"
                          numOctaves="5" seed="4" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="45"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="5"/>
          </filter>
          <!-- B – közepes torzítás, zsálya sávokhoz -->
          <filter id="wc-b" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.024 0.018"
                          numOctaves="4" seed="11" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="4"/>
          </filter>
          <!-- C – finomabb, kisebb ecsetfoltokhoz -->
          <filter id="wc-c" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.022"
                          numOctaves="3" seed="17" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="3.5"/>
          </filter>
          <!-- D – levendula-tónushoz, lassabb torzítás -->
          <filter id="wc-d" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.028"
                          numOctaves="4" seed="23" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="30"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="5"/>
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
