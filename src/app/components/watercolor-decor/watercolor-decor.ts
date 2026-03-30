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
          <!-- Filter A – erőteljes organikus él, hero szekció nagy foltjaihoz -->
          <filter id="wc-a" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.025"
                          numOctaves="5" seed="4" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="42"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="5"/>
          </filter>

          <!-- Filter B – közepes organikus él, általános foltokhoz -->
          <filter id="wc-b" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.024 0.018"
                          numOctaves="4" seed="11" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="32"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="4"/>
          </filter>

          <!-- Filter C – finomabb él, kisebb kiegészítő foltokhoz -->
          <filter id="wc-c" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.022"
                          numOctaves="3" seed="17" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="24"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="3"/>
          </filter>

          <!-- Filter D – levendula/soft foltokhoz -->
          <filter id="wc-d" x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.028"
                          numOctaves="4" seed="23" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="28"
                               xChannelSelector="R" yChannelSelector="G" result="d"/>
            <feGaussianBlur in="d" stdDeviation="4.5"/>
          </filter>
        </defs>

        <!-- ═══════════════════════════════════════════
             HERO SZEKCIÓ  (y ≈ 0–780)
             ═══════════════════════════════════════════ -->

        <!-- Nagy korall folt – jobb felső sarok, domináns -->
        <g filter="url(#wc-a)">
          <ellipse cx="1160" cy="200" rx="320" ry="240" fill="#D4563C" opacity="0.30"/>
          <ellipse cx="1110" cy="160" rx="200" ry="155" fill="#D4563C" opacity="0.22"/>
          <ellipse cx="1200" cy="245" rx="170" ry="125" fill="#E87862" opacity="0.14"/>
        </g>

        <!-- Zsálya folt – bal alsó sarok -->
        <g filter="url(#wc-b)">
          <ellipse cx="90"  cy="660" rx="260" ry="180" fill="#5EA855" opacity="0.28"/>
          <ellipse cx="50"  cy="625" rx="170" ry="120" fill="#5EA855" opacity="0.18"/>
          <ellipse cx="130" cy="690" rx="130" ry="90"  fill="#82C878" opacity="0.12"/>
        </g>

        <!-- Levendula accent – bal felső sarok -->
        <g filter="url(#wc-d)">
          <ellipse cx="195" cy="145" rx="165" ry="120" fill="#8A65CC" opacity="0.22"/>
          <ellipse cx="155" cy="110" rx="105" ry="80"  fill="#8A65CC" opacity="0.14"/>
        </g>

        <!-- Kis korall visszhang – jobb alsó -->
        <g filter="url(#wc-c)">
          <ellipse cx="1340" cy="720" rx="150" ry="105" fill="#D4563C" opacity="0.16"/>
        </g>

        <!-- Apró zsálya echo – felső középtől jobbra -->
        <g filter="url(#wc-c)">
          <ellipse cx="800" cy="55" rx="130" ry="75" fill="#5EA855" opacity="0.13"/>
        </g>


        <!-- ═══════════════════════════════════════════
             BEMUTATÓ SZEKCIÓ  (y ≈ 780–1560)
             ═══════════════════════════════════════════ -->

        <!-- Levendula mosás – jobb oldal -->
        <g filter="url(#wc-d)">
          <ellipse cx="1350" cy="1080" rx="230" ry="290" fill="#8A65CC" opacity="0.13"/>
        </g>

        <!-- Korall mosás – bal oldal -->
        <g filter="url(#wc-a)">
          <ellipse cx="100"  cy="1000" rx="195" ry="260" fill="#D4563C" opacity="0.11"/>
        </g>

        <!-- Zsálya vízszintes sáv – szekció alján -->
        <g filter="url(#wc-b)">
          <ellipse cx="720" cy="1500" rx="380" ry="100" fill="#5EA855" opacity="0.10"/>
        </g>


        <!-- ═══════════════════════════════════════════
             MIT TARTALMAZ SZEKCIÓ  (y ≈ 1560–2340)
             ═══════════════════════════════════════════ -->

        <!-- Zsálya – bal felső -->
        <g filter="url(#wc-b)">
          <ellipse cx="180" cy="1800" rx="230" ry="170" fill="#5EA855" opacity="0.16"/>
        </g>

        <!-- Korall – jobb közép -->
        <g filter="url(#wc-c)">
          <ellipse cx="1310" cy="2000" rx="205" ry="260" fill="#D4563C" opacity="0.13"/>
        </g>

        <!-- Levendula echo – alsó közép -->
        <g filter="url(#wc-d)">
          <ellipse cx="720" cy="2280" rx="250" ry="90"  fill="#8A65CC" opacity="0.10"/>
        </g>


        <!-- ═══════════════════════════════════════════
             GALÉRIA SZEKCIÓ  (y ≈ 2340–3120)
             ═══════════════════════════════════════════ -->

        <!-- Levendula felső mosás -->
        <g filter="url(#wc-d)">
          <ellipse cx="720" cy="2420" rx="320" ry="110" fill="#8A65CC" opacity="0.11"/>
        </g>

        <!-- Korall – jobb alsó sarok -->
        <g filter="url(#wc-a)">
          <ellipse cx="1360" cy="3050" rx="175" ry="140" fill="#D4563C" opacity="0.13"/>
        </g>

        <!-- Zsálya – bal alsó -->
        <g filter="url(#wc-c)">
          <ellipse cx="80"   cy="3000" rx="155" ry="190" fill="#5EA855" opacity="0.12"/>
        </g>


        <!-- ═══════════════════════════════════════════
             VÁSÁRLÁS SZEKCIÓ  (y ≈ 3120–3900)
             ═══════════════════════════════════════════ -->

        <!-- Nagy levendula – bal oldal -->
        <g filter="url(#wc-d)">
          <ellipse cx="260" cy="3350" rx="270" ry="215" fill="#8A65CC" opacity="0.22"/>
          <ellipse cx="210" cy="3310" rx="175" ry="140" fill="#8A65CC" opacity="0.15"/>
        </g>

        <!-- Nagy korall – jobb oldal -->
        <g filter="url(#wc-a)">
          <ellipse cx="1220" cy="3500" rx="240" ry="195" fill="#D4563C" opacity="0.20"/>
          <ellipse cx="1270" cy="3555" rx="155" ry="120" fill="#D4563C" opacity="0.13"/>
        </g>

        <!-- Zsálya alulsáv -->
        <g filter="url(#wc-b)">
          <ellipse cx="720" cy="3830" rx="220" ry="85"  fill="#5EA855" opacity="0.13"/>
        </g>


        <!-- ═══════════════════════════════════════════
             FOOTER  (y ≈ 3900–5200)
             ═══════════════════════════════════════════ -->

        <!-- Finom korall visszhang a footer felett -->
        <g filter="url(#wc-c)">
          <ellipse cx="720" cy="3980" rx="300" ry="80" fill="#D4563C" opacity="0.08"/>
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
