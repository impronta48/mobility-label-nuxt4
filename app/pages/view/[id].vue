<template>
  <div class="container my-4">
    <div class="mb-3">
      <NuxtLink to="/" class="back-link">← Torna alla lista</NuxtLink>
    </div>

    <div v-if="!survey" class="text-muted fst-italic">
      Questionario non trovato. <NuxtLink to="/">Torna alla lista</NuxtLink>
    </div>

    <template v-else-if="!hasData">
      <h1>Il questionario per questa sede non è ancora stato compilato.</h1>
    </template>

    <template v-else>
      <!-- ── Mobility Label card ─────────────────────────────────────────── -->
      <div ref="labelCardRef" class="ml-card">

        <!-- Header: logo + title -->
        <div class="ml-header">
          <div class="ml-logo-cell">
            <a href="https://moma.biz" target="_blank" rel="noopener">
              <img :src="publicAsset('images/momabiz-logo.png')" alt="MoMa.BIZ" class="ml-logo-img" />
            </a>
          </div>
          <div class="ml-title-cell">
            <span class="ml-title-main">MOBILITY LABEL</span>
            <span class="ml-title-sub">for transport and mobility<br>in business and industrial zones</span>
          </div>
        </div>

        <!-- Company / Office -->
        <div class="ml-company-cell">
          <div class="ml-company-name">{{ survey.company_name }}</div>
          <div class="ml-office-name">{{ survey.office_name }}</div>
        </div>

        <!-- Scale: inline SVG polygons so html2canvas exports the chevron arrows correctly -->
        <div class="ml-scale-section">
          <svg
            :viewBox="`0 0 ${SVG_W} ${SVG_H}`"
            :width="SVG_W"
            :height="SVG_H"
            xmlns="http://www.w3.org/2000/svg"
            class="ml-scale-svg"
          >
            <g v-for="(bar, i) in SVG_BARS" :key="bar.cls">
              <polygon :points="barChevron(i, bar.widthPx)" :fill="bar.color" />
              <text
                x="14"
                :y="i * SVG_STRIDE + SVG_BAR_H / 2"
                :fill="bar.darkText ? '#222' : '#fff'"
                font-family="Arial, Helvetica, sans-serif"
                font-size="17"
                font-weight="bold"
                dominant-baseline="central"
              >{{ bar.cls }}</text>
            </g>
            <!-- indicator: left-pointing chevron at the active class row -->
            <polygon :points="indicatorChevron" fill="#1a1a1a" />
            <text
              :x="IND_TEXT_X"
              :y="indicatorTextY"
              fill="white"
              font-family="Arial, Helvetica, sans-serif"
              font-size="26"
              font-weight="bold"
              text-anchor="middle"
              dominant-baseline="central"
            >{{ result.class_total }}</text>
          </svg>
        </div>

        <!-- Box icons: 2 rows × 4 -->
        <div class="ml-icons-section">
          <div class="ml-icons-row">
            <img
              v-for="n in [1, 2, 3, 4]"
              :key="n"
              :src="publicAsset(`images/icons/Icons_EAP-box${n}-${boxClasses[n - 1].cls}.png`)"
              :title="`${boxClasses[n - 1].label}: Classe ${boxClasses[n - 1].cls}`"
              class="ml-icon-img"
            />
          </div>
          <div class="ml-icons-row">
            <img
              v-for="n in [5, 6, 7, 8]"
              :key="n"
              :src="publicAsset(`images/icons/Icons_EAP-box${n}-${boxClasses[n - 1].cls}.png`)"
              :title="`${boxClasses[n - 1].label}: Classe ${boxClasses[n - 1].cls}`"
              class="ml-icon-img"
            />
          </div>
        </div>

        <!-- Footer: date + IEE logo + disclaimer -->
        <div class="ml-footer-cell">
          <div class="ml-footer-date"><strong>Data:</strong> {{ curDate }}</div>
          <a href="https://ec.europa.eu/energy/intelligent/" target="_blank" rel="noopener">
            <img
              :src="publicAsset('images/iee_logo_supportedby_72.jpg')"
              alt="Intelligent Energy Europe"
              class="ml-iee-logo"
            />
          </a>
          <p class="ml-disclaimer-bold"><strong>Questa è un'etichetta di autovalutazione.</strong></p>
          <p class="ml-disclaimer-text">
            La sola responsabilità per il contenuto di questa etichetta è degli autori.
            Non rispecchia le opinioni dell'Unione Europea. La Commissione Europea non è
            responsabile per gli usi che possono essere fatti dei contenuti di questa pagina.
          </p>
          <p class="ml-credit-text">
            La prima versione della Mobility Label è stata sviluppata nell'ambito del progetto
            Europeo MoMa.Biz, finanziato dalla linea Intelligent Energy Europe con lo scopo di
            valutare l'accessibilità delle Zone Industriali e dei Centri Uffici in Europa.
          </p>
        </div>
      </div>

      <!-- ── Score detail ──────────────────────────────────────────────────── -->
      <div class="card my-4" style="max-width: 540px; margin-left: auto; margin-right: auto;">
        <div class="card-body p-3">
          <p class="fw-bold mb-2">
            Azienda: <strong>{{ survey.company_name }}</strong> –
            Sede: <strong>{{ survey.office_name }}</strong> –
            Classe: <strong>{{ result.class_total }}</strong> –
            Punteggio: <strong>{{ result.total.toFixed(1) }}</strong>
          </p>
          <div v-for="b in boxDetails" :key="b.name" class="py-1 border-bottom small">
            {{ b.name }}: Classe
            <span class="badge" :style="{ backgroundColor: classColor(b.cls) }">{{ b.cls }}</span>
            – {{ b.score.toFixed(1) }}
          </div>
        </div>
      </div>

      <div class="d-flex gap-3 flex-wrap my-4">
        <NuxtLink :to="`/edit/${survey.id}`" class="btn btn-primary">Modifica questionario</NuxtLink>
        <button class="btn btn-info text-white" :disabled="exporting" @click="exportPng">
          <span v-if="exporting">Esportazione…</span>
          <span v-else>⬇ Esporta PNG</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { calculateLabel, CLASS_COLORS } from '~/composables/useMobilityLabel'
import html2canvas from 'html2canvas'
import { joinURL } from 'ufo'

const route = useRoute()
const { getById } = useMobilityLabel()
const { app } = useRuntimeConfig()

const survey = ref(getById(route.params.id as string))
const result = computed(() => survey.value ? calculateLabel(survey.value) : null!)

function publicAsset(path: string) {
  return joinURL(app.baseURL, path)
}

const hasData = computed(() => {
  if (!survey.value) return false
  const s = survey.value
  return Object.values(s.box1).some(v => Number(v) > 0) ||
    Object.values(s.box2).some(v => Number(v) > 0)
})

function classColor(cls: string) {
  return CLASS_COLORS[cls] ?? '#aaa'
}

const curDate = computed(() => {
  const d = new Date()
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
})

// ── SVG scale constants ───────────────────────────────────────────────────────
// Using SVG <polygon> elements instead of CSS clip-path so html2canvas
// correctly exports the chevron arrow shapes.
const SVG_BAR_H  = 44
const SVG_GAP    = 4
const SVG_STRIDE = SVG_BAR_H + SVG_GAP   // 48px per row
const SVG_NOTCH  = 18                      // chevron tip depth
const SVG_W      = 496                     // total SVG width (card 540 - 8 border - 36 padding)
const SVG_H      = 10 * SVG_BAR_H + 9 * SVG_GAP  // 476px
const IND_X      = 318                     // indicator column starts here
const IND_NOTCH  = 20
const IND_TEXT_X = IND_X + IND_NOTCH + (SVG_W - IND_X - IND_NOTCH) / 2  // ≈ 417

const SVG_BARS = [
  { cls: 'A+++', color: '#00A651', widthPx: 118, darkText: false },
  { cls: 'A++',  color: '#4DB848', widthPx: 136, darkText: false },
  { cls: 'A+',   color: '#BDD630', widthPx: 158, darkText: true  },
  { cls: 'A',    color: '#FFF101', widthPx: 177, darkText: true  },
  { cls: 'B',    color: '#FDB714', widthPx: 198, darkText: false },
  { cls: 'C',    color: '#F37021', widthPx: 220, darkText: false },
  { cls: 'D',    color: '#EE1C25', widthPx: 242, darkText: false },
  { cls: 'E',    color: '#EE1C25', widthPx: 260, darkText: false },
  { cls: 'F',    color: '#EE1C25', widthPx: 282, darkText: false },
  { cls: 'G',    color: '#EE1C25', widthPx: 304, darkText: false },
]

const SCALE_ORDER = ['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G']

function barChevron(i: number, w: number): string {
  const y   = i * SVG_STRIDE
  const by  = y + SVG_BAR_H
  const mid = y + SVG_BAR_H / 2
  return `0,${y} ${w - SVG_NOTCH},${y} ${w},${mid} ${w - SVG_NOTCH},${by} 0,${by}`
}

const indicatorChevron = computed((): string => {
  const idx = Math.max(0, SCALE_ORDER.indexOf(result.value?.class_total ?? 'G'))
  const y   = idx * SVG_STRIDE
  const by  = y + SVG_BAR_H
  const mid = y + SVG_BAR_H / 2
  return `${IND_X + IND_NOTCH},${y} ${SVG_W},${y} ${SVG_W},${by} ${IND_X + IND_NOTCH},${by} ${IND_X},${mid}`
})

const indicatorTextY = computed((): number => {
  const idx = Math.max(0, SCALE_ORDER.indexOf(result.value?.class_total ?? 'G'))
  return idx * SVG_STRIDE + SVG_BAR_H / 2
})

const boxClasses = computed(() => [
  { cls: result.value.class1, label: 'Mobilità ciclabile' },
  { cls: result.value.class2, label: 'Mobilità pedonale' },
  { cls: result.value.class3, label: 'Trasporto pubblico' },
  { cls: result.value.class4, label: 'Car pooling' },
  { cls: result.value.class5, label: 'Sharing mobility' },
  { cls: result.value.class6, label: 'Auto privata' },
  { cls: result.value.class7, label: 'Mobilità ridotta' },
  { cls: result.value.class8, label: 'Ulteriori misure' },
])

const boxDetails = computed(() => [
  { name: 'Box 1 – Mobilità ciclabile',  cls: result.value.class1, score: result.value.box1 },
  { name: 'Box 2 – Mobilità pedonale',   cls: result.value.class2, score: result.value.box2 },
  { name: 'Box 3 – Trasporto pubblico',  cls: result.value.class3, score: result.value.box3 },
  { name: 'Box 4 – Car pooling',         cls: result.value.class4, score: result.value.box4 },
  { name: 'Box 5 – Sharing mobility',    cls: result.value.class5, score: result.value.box5 },
  { name: 'Box 6 – Auto privata',        cls: result.value.class6, score: result.value.box6 },
  { name: 'Box 7 – Mobilità ridotta',    cls: result.value.class7, score: result.value.box7 },
  { name: 'Box 8 – Ulteriori misure',    cls: result.value.class8, score: result.value.box8 },
])

// ── PNG export ────────────────────────────────────────────────────────────────
const labelCardRef = ref<HTMLElement | null>(null)
const exporting = ref(false)

async function exportPng() {
  if (!labelCardRef.value || exporting.value) return
  exporting.value = true
  try {
    const canvas = await html2canvas(labelCardRef.value, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    })
    const link = document.createElement('a')
    const company = survey.value?.company_name ?? 'label'
    const office  = survey.value?.office_name  ?? ''
    link.download = `mobility-label-${company}-${office}.png`
      .replace(/[^a-z0-9_\-]/gi, '_')
      .replace(/_+/g, '_')
      .toLowerCase()
    link.href = canvas.toDataURL('image/png')
    link.click()
  } finally {
    exporting.value = false
  }
}
</script>

<style scoped>
/* ── Card wrapper ───────────────────────────────────────────────────────────── */
.ml-card {
  border: 8px solid #357c38;
  border-radius: 20px;
  width: 540px;
  max-width: 100%;
  margin: 1.5rem auto;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  padding: 10px;
}

/* ── Header ─────────────────────────────────────────────────────────────────── */
.ml-header {
  display: flex;
  align-items: stretch;
  min-height: 90px;
}
.ml-logo-cell {
  background: #fff;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 145px;
  flex-shrink: 0;
  border-right: 2px solid #4caf50;
}
.ml-logo-img {
  max-width: 118px;
  height: auto;
}
.ml-title-cell {
  background: #2e7d32;
  color: #fff;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
}
.ml-title-main {
  font-size: 1.45rem;
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
.ml-title-sub {
  font-size: 0.82rem;
  font-weight: 400;
  line-height: 1.4;
  margin-top: 3px;
  opacity: 0.93;
}

/* ── Company ────────────────────────────────────────────────────────────────── */
.ml-company-cell {
  background: #fff;
  padding: 14px 18px 12px;
  border-bottom: 2px solid #4caf50;
}
.ml-company-name {
  font-size: 1.65rem;
  font-weight: 700;
  color: #111;
  line-height: 1.2;
}
.ml-office-name {
  font-size: 1rem;
  color: #444;
  margin-top: 3px;
}

/* ── Scale section ──────────────────────────────────────────────────────────── */
.ml-scale-section {
  background: #fff;
  border-bottom: 2px solid #4caf50;
  padding: 18px;
  line-height: 0; /* remove inline-block gap under SVG */
}
.ml-scale-svg {
  display: block;
  max-width: 100%;
}

/* ── Icons ──────────────────────────────────────────────────────────────────── */
.ml-icons-section {
  background: #fff;
  border-bottom: 2px solid #4caf50;
  padding: 10px 14px;
}
.ml-icons-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 6px;
}
.ml-icons-row:last-child { margin-bottom: 0; }
.ml-icon-img {
  width: 110px;
  height: 110px;
  object-fit: contain;
  padding: 4px;
}

/* ── Footer ─────────────────────────────────────────────────────────────────── */
.ml-footer-cell {
  background: #fff;
  padding: 10px 18px 14px;
  font-size: 0.76rem;
  color: #444;
  line-height: 1.45;
}
.ml-footer-date { text-align: right; margin-bottom: 6px; font-size: 0.82rem; }
.ml-iee-logo { display: block; margin: 4px 0 8px; }
.ml-disclaimer-bold { margin: 0 0 4px; font-size: 0.8rem; }
.ml-disclaimer-text { margin: 0 0 6px; }
.ml-credit-text { margin: 0; color: #666; }
</style>
