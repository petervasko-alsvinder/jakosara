# Jakosara – Kismama Napló Weboldal

Angular 18 alapú értékesítési oldal az "Úton az anyaság felé" digitális kismama naplóhoz.

## Szekciók

- **Hero** – nagy cím, leírás, 2 gomb, borítókép (enyhe forgatással)
- **Bemutató** – 3 kártyás szekció a napló lényegéről
- **Mit tartalmaz** – részletes lista + képek stack elrendezésben
- **Galéria** – rácsos elrendezés lightbox nagyítással (kattintásra megnyílik)
- **Vásárlás** – árkártya 3 990 Ft-tal + garanciablokk
- **Footer** – márkanév, linkek, copyright

## Színpaletta

A napló watercolor stílusából kivont színek:

| Szín | Hex | Használat |
|------|-----|-----------|
| Dusty rose | `#C4927A` | Gombok, kiemelések |
| Zsálya zöld | `#A8B5A0` | Checkmarkok, badge-ek |
| Halvány levendula | `#C4B5D4` | Vásárlás szekció háttér |
| Meleg krém | `#FAF8F4` | Alap háttér |
| Meleg sötét | `#3D3530` | Szöveg, footer |

## Betűtípusok

- **Playfair Display** – címek, kiemelések (Google Fonts)
- **Lato** – folyószöveg, gombok (Google Fonts)

## Komponensek

```
src/app/components/
├── hero/
├── about/
├── features/
├── gallery/
├── purchase/
└── footer/
```

## Indítás

```bash
npx ng serve
```

## Build

```bash
npx ng build
```

Output: `dist/jakosara-web/`

## GitHub

https://github.com/petervasko-alsvinder/jakosara
