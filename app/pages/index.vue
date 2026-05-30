<template>
  <div class="page-container">
    <h1>Mobility Label</h1>
    <p class="subtitle">Questionario di autovalutazione della mobilità aziendale</p>

    <section class="card new-survey">
      <h2>Nuovo questionario</h2>
      <form @submit.prevent="onCreate">
        <div class="form-row">
          <label>
            Nome azienda *
            <input v-model="newForm.company_name" type="text" required placeholder="es. Acme S.r.l." />
          </label>
          <label>
            Sede *
            <input v-model="newForm.office_name" type="text" required placeholder="es. Sede di Milano" />
          </label>
          <label>
            Anno *
            <input v-model.number="newForm.year" type="number" required :min="2000" :max="2100" />
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Crea questionario</button>
      </form>
    </section>

    <section class="surveys-list">
      <h2>Questionari salvati</h2>
      <p v-if="surveys.length === 0" class="empty-note">
        Nessun questionario ancora compilato. Creane uno nuovo qui sopra.
      </p>
      <table v-else>
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
            <td class="actions">
              <NuxtLink :to="`/view/${s.id}`" class="btn btn-sm btn-secondary">Visualizza</NuxtLink>
              <NuxtLink :to="`/edit/${s.id}`" class="btn btn-sm btn-primary">Modifica</NuxtLink>
              <button class="btn btn-sm btn-danger" @click="onDelete(s.id)">Elimina</button>
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
