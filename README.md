# Mobility Label – Standalone App

Applicazione **Nuxt 4** autonoma per la compilazione e la visualizzazione del **Mobility Label** aziendale (autovalutazione della mobilità sostenibile).

> I dati vengono salvati nel **localStorage** del browser — nessun backend necessario.

## Avvio rapido

```bash
cd mobility-label-nuxt4
npm install
npm run dev
```

Poi apri [http://localhost:3000](http://localhost:3000).

## Funzionalità

| Pagina | Percorso | Descrizione |
|---|---|---|
| Home | `/` | Lista dei questionari salvati; creazione di un nuovo questionario |
| Modifica | `/edit/[id]` | Compilazione del questionario (8 box, ~60 voci) |
| Visualizza | `/view/[id]` | Etichetta grafica con classe A+++–G, dettaglio punteggi per box |

## Struttura

```
app/
├── app.vue                        # layout root
├── assets/css/main.css            # stili globali
├── components/
│   └── CheckItem.vue              # checkbox con descrizione
├── composables/
│   └── useMobilityLabel.ts        # logica, calcolo punteggi, localStorage
└── pages/
    ├── index.vue
    ├── edit/[id].vue
    └── view/[id].vue
```

## Build di produzione

```bash
npm run build      # SSR
npm run generate   # statico (SPA)
```
