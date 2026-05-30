<template>
  <div class="site-wrapper">
    <nav class="top-nav">
      <NuxtLink to="/" class="nav-brand">
        <img src="/logo-semplice-testo-dx.svg" alt="MobilitySquare" class="nav-logo" />
      </NuxtLink>
      <span class="nav-tagline">Mobility Label</span>
    </nav>

    <main class="site-main">
      <NuxtPage />
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <p class="footer-credits">
          Strumento sviluppato da
          <a href="https://mobilitysquare.eu" target="_blank" rel="noopener">MobilitySquare</a>
          nell'ambito del progetto
          <a href="https://moma.biz" target="_blank" rel="noopener">MoMa.Biz</a>,
          finanziato dalla linea Intelligent Energy Europe dell'Unione Europea.
        </p>
        <p class="footer-disclaimer">
          Questa è un'etichetta di autovalutazione. La sola responsabilità per i contenuti è degli autori;
          non rispecchia le opinioni dell'Unione Europea.
        </p>
        <p class="footer-copy">
          &copy; <a href="https://mobilitysquare.eu" target="_blank" rel="noopener">mobilitysquare.eu</a>
        </p>
      </div>
    </footer>
  </div>
</template>
