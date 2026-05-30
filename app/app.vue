<script setup lang="ts">
import { joinURL } from 'ufo'
import Footer from './components/Footer.vue';

const { app } = useRuntimeConfig()
const logoSrc = joinURL(app.baseURL, 'logo-semplice-testo-dx.svg')
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="top-nav navbar px-3">
      <NuxtLink to="/" class="navbar-brand">
        <img :src="logoSrc" alt="MobilitySquare" class="nav-logo" />
      </NuxtLink>
      <span class="nav-tagline ms-auto">Mobility Label</span>
    </nav>

    <main class="flex-grow-1">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>
