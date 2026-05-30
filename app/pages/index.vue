<template>
  <div class="container my-5">
    <h1>Mobility Label</h1>
    <p class="text-muted mb-4">Questionario di autovalutazione della mobilità aziendale</p>

    <section class="card mb-4">
      <div class="card-body">
        <h2 class="card-title text-brand h5">Nuovo questionario</h2>
        <form @submit.prevent="onCreate">
          <div class="row g-3 mb-3">
            <div class="col-md">
              <label class="form-label fw-semibold">Nome azienda *</label>
              <input v-model="newForm.company_name" type="text" class="form-control" required placeholder="es. Acme S.r.l." />
            </div>
            <div class="col-md">
              <label class="form-label fw-semibold">Sede *</label>
              <input v-model="newForm.office_name" type="text" class="form-control" required placeholder="es. Sede di Milano" />
            </div>
            <div class="col-md">
              <label class="form-label fw-semibold">Anno *</label>
              <input v-model.number="newForm.year" type="number" class="form-control" required :min="2000" :max="2100" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Crea questionario</button>
        </form>
      </div>
    </section>

    <section>
      <h2>Questionari salvati</h2>
      <div class="alert alert-warning mt-3">
        <h4>Attenzione</h4>
        <p>I questionari sono salvati solo localmente nel browser e non vengono sincronizzati con un server.<br>
        I dati sono 100% riservati, ma se cancelli la cache del browser o cambi dispositivo, i questionari verranno persi.</p>
        💡 Per poter salvare le tue MobilityLabel e inserirle nei PSCL, e ottenere 100+ altre funzioni specifiche per il MobilityManager utilizza <a href="https://mobilitysquare.eu/mobility-management/mobility48" target="_blank">la piattaforma Mobility48</a>
      </div>

      <p v-if="surveys.length === 0" class="text-muted fst-italic">
        Nessun questionario ancora compilato. Creane uno nuovo qui sopra.
      </p>
      <table v-else class="table table-striped my-4">
        <thead>
          <tr>
            <th>Azienda</th>
            <th>Sede</th>
            <th>Anno</th>
            <th>Classe</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in surveys" :key="s.id">
            <td>{{ s.company_name }}</td>
            <td>{{ s.office_name }}</td>
            <td>{{ s.year }}</td>
            <td>
              <span
                class="class-badge"
                :style="{ backgroundColor: classColor(calculateLabel(s).class_total) }"
              >
                {{ calculateLabel(s).class_total }}
              </span>
            </td>
            <td>
              <div class="d-flex gap-2 flex-wrap">
                <NuxtLink :to="`/view/${s.id}`" class="btn btn-sm btn-secondary">Visualizza</NuxtLink>
                <NuxtLink :to="`/edit/${s.id}`" class="btn btn-sm btn-primary">Modifica</NuxtLink>
                <button class="btn btn-sm btn-danger" @click="onDelete(s.id)">Elimina</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup lang="ts">
import { calculateLabel, CLASS_COLORS } from '~/composables/useMobilityLabel'

const { loadAll, createSurvey, deleteSurvey } = useMobilityLabel()

const surveys = ref(loadAll())

const newForm = reactive({
  company_name: '',
  office_name: '',
  year: new Date().getFullYear(),
})

function classColor(cls: string) {
  return CLASS_COLORS[cls] ?? '#aaa'
}

function onCreate() {
  const s = createSurvey(newForm.company_name, newForm.office_name, newForm.year)
  surveys.value = loadAll()
  navigateTo(`/edit/${s.id}`)
}

function onDelete(id: string) {
  if (confirm('Eliminare questo questionario?')) {
    deleteSurvey(id)
    surveys.value = loadAll()
  }
}
</script>
