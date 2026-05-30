<template>
  <div class="container my-4" v-if="survey">
    <div class="mb-4">
      <NuxtLink to="/" class="back-link">← Torna alla lista</NuxtLink>
      <h2>{{ survey.company_name }} – {{ survey.office_name }}</h2>
      <h3>Questionario Mobility Label {{ survey.year }}</h3>
    </div>

    <form @submit.prevent="onSubmit">

      <!-- BOX 1 -->
      <fieldset class="box-group">
        <legend>{{ labels.box1.label }}</legend>
        <CheckItem v-model="survey.box1.accessible"            :label="labels.box1.accessible"            :description="descriptions.box1.accessible" />
        <CheckItem v-model="survey.box1.theft_prevention"      :label="labels.box1.theft_prevention"      :description="descriptions.box1.theft_prevention" />
        <CheckItem v-model="survey.box1.arrival_bike"          :label="labels.box1.arrival_bike"          :description="descriptions.box1.arrival_bike" />
        <CheckItem v-model="survey.box1.internal_bikes"        :label="labels.box1.internal_bikes"        :description="descriptions.box1.internal_bikes" />
        <CheckItem v-model="survey.box1.pool_bikes"            :label="labels.box1.pool_bikes"            :description="descriptions.box1.pool_bikes" />
        <CheckItem v-model="survey.box1.cycling_business_trips" :label="labels.box1.cycling_business_trips" :description="descriptions.box1.cycling_business_trips" />
        <CheckItem v-model="survey.box1.internal_cycling"      :label="labels.box1.internal_cycling"      :description="descriptions.box1.internal_cycling" />
        <CheckItem v-model="survey.box1.cycling_infrast"       :label="labels.box1.cycling_infrast"       :description="descriptions.box1.cycling_infrast" />
      </fieldset>

      <!-- BOX 2 -->
      <fieldset class="box-group">
        <legend>{{ labels.box2.label }}</legend>
        <CheckItem v-model="survey.box2.azessible"          :label="labels.box2.azessible"          :description="descriptions.box2.azessible" />
        <CheckItem v-model="survey.box2.infrastructure_walk" :label="labels.box2.infrastructure_walk" :description="descriptions.box2.infrastructure_walk" />
        <CheckItem v-model="survey.box2.arrival_walk"       :label="labels.box2.arrival_walk"       :description="descriptions.box2.arrival_walk" />
      </fieldset>

      <!-- BOX 3 -->
      <fieldset class="box-group">
        <legend>{{ labels.box3.label }}</legend>
        <CheckItem v-model="survey.box3.bus_accessible"    :label="labels.box3.bus_accessible"    :description="descriptions.box3.bus_accessible" />
        <CheckItem v-model="survey.box3.bus_info"          :label="labels.box3.bus_info"          :description="descriptions.box3.bus_info" />
        <CheckItem v-model="survey.box3.co_financing"      :label="labels.box3.co_financing"      :description="descriptions.box3.co_financing" />
        <CheckItem v-model="survey.box3.bus_facilities"    :label="labels.box3.bus_facilities"    :description="descriptions.box3.bus_facilities" />
        <CheckItem v-model="survey.box3.lobby"             :label="labels.box3.lobby"             :description="descriptions.box3.lobby" />
        <CheckItem v-model="survey.box3.bus_infrastructure" :label="labels.box3.bus_infrastructure" :description="descriptions.box3.bus_infrastructure" />
        <CheckItem v-model="survey.box3.shuttle_bus"       :label="labels.box3.shuttle_bus"       :description="descriptions.box3.shuttle_bus" />
        <CheckItem v-model="survey.box3.vanpooling"        :label="labels.box3.vanpooling"        :description="descriptions.box3.vanpooling" />
      </fieldset>

      <!-- BOX 4 -->
      <fieldset class="box-group">
        <legend>{{ labels.box4.label }}</legend>
        <CheckItem v-model="survey.box4.matching_service"      :label="labels.box4.matching_service"      :description="descriptions.box4.matching_service" />
        <CheckItem v-model="survey.box4.parking_carpooling"    :label="labels.box4.parking_carpooling"    :description="descriptions.box4.parking_carpooling" />
        <CheckItem v-model="survey.box4.carpooling_incentives" :label="labels.box4.carpooling_incentives" :description="descriptions.box4.carpooling_incentives" />
      </fieldset>

      <!-- BOX 5 -->
      <fieldset class="box-group">
        <legend>{{ labels.box5.label }}</legend>
        <CheckItem v-model="survey.box5.carsharing"                 :label="labels.box5.carsharing"                 :description="descriptions.box5.carsharing" />
        <CheckItem v-model="survey.box5.carsharing_convenzioni"     :label="labels.box5.carsharing_convenzioni"     :description="descriptions.box5.carsharing_convenzioni" />
        <CheckItem v-model="survey.box5.bike_sharing"               :label="labels.box5.bike_sharing"               :description="descriptions.box5.bike_sharing" />
        <CheckItem v-model="survey.box5.bike_sharing_convenzioni"   :label="labels.box5.bike_sharing_convenzioni"   :description="descriptions.box5.bike_sharing_convenzioni" />
        <CheckItem v-model="survey.box5.scooter_sharing"            :label="labels.box5.scooter_sharing"            :description="descriptions.box5.scooter_sharing" />
        <CheckItem v-model="survey.box5.scooter_sharing_convenzioni" :label="labels.box5.scooter_sharing_convenzioni" :description="descriptions.box5.scooter_sharing_convenzioni" />
        <CheckItem v-model="survey.box5.monopattini"                :label="labels.box5.monopattini"                :description="descriptions.box5.monopattini" />
        <CheckItem v-model="survey.box5.monopattini_convenzioni"    :label="labels.box5.monopattini_convenzioni"    :description="descriptions.box5.monopattini_convenzioni" />
        <CheckItem v-model="survey.box5.incentives_sharing"         :label="labels.box5.incentives_sharing"         :description="descriptions.box5.incentives_sharing" />
      </fieldset>

      <!-- BOX 6 -->
      <fieldset class="box-group">
        <legend>{{ labels.box6.label }}</legend>
        <CheckItem v-model="survey.box6.accessibility"      :label="labels.box6.accessibility"      :description="descriptions.box6.accessibility" />
        <CheckItem v-model="survey.box6.business_trips"     :label="labels.box6.business_trips"     :description="descriptions.box6.business_trips" />
        <CheckItem v-model="survey.box6.efficient_use_work" :label="labels.box6.efficient_use_work" :description="descriptions.box6.efficient_use_work" />
        <CheckItem v-model="survey.box6.sensible_car_use"   :label="labels.box6.sensible_car_use"   :description="descriptions.box6.sensible_car_use" />
        <CheckItem v-model="survey.box6.park_ride"          :label="labels.box6.park_ride"          :description="descriptions.box6.park_ride" />
        <CheckItem v-model="survey.box6.parking_fee"        :label="labels.box6.parking_fee"        :description="descriptions.box6.parking_fee" />
        <CheckItem v-model="survey.box6.parking_management" :label="labels.box6.parking_management" :description="descriptions.box6.parking_management" />
        <CheckItem v-model="survey.box6.car_free"           :label="labels.box6.car_free"           :description="descriptions.box6.car_free" />
        <CheckItem v-model="survey.box6.access_management"  :label="labels.box6.access_management"  :description="descriptions.box6.access_management" />
        <CheckItem v-model="survey.box6.vhl_restrictions"   :label="labels.box6.vhl_restrictions"   :description="descriptions.box6.vhl_restrictions" />
        <CheckItem v-model="survey.box6.clean_vhls"         :label="labels.box6.clean_vhls"         :description="descriptions.box6.clean_vhls" />
        <CheckItem v-model="survey.box6.alternative_fuels"  :label="labels.box6.alternative_fuels"  :description="descriptions.box6.alternative_fuels" />
        <CheckItem v-model="survey.box6.eco_driving"        :label="labels.box6.eco_driving"        :description="descriptions.box6.eco_driving" />
        <CheckItem v-model="survey.box6.its"                :label="labels.box6.its"                :description="descriptions.box6.its" />
        <CheckItem v-model="survey.box6.route_planning"     :label="labels.box6.route_planning"     :description="descriptions.box6.route_planning" />
        <CheckItem v-model="survey.box6.traffic_info"       :label="labels.box6.traffic_info"       :description="descriptions.box6.traffic_info" />
      </fieldset>

      <!-- BOX 7 -->
      <fieldset class="box-group">
        <legend>{{ labels.box7.label }}</legend>
        <CheckItem v-model="survey.box7.accessibility_signs"    :label="labels.box7.accessibility_signs"    :description="descriptions.box7.accessibility_signs" />
        <CheckItem v-model="survey.box7.infrastructure_mobility" :label="labels.box7.infrastructure_mobility" :description="descriptions.box7.infrastructure_mobility" />
      </fieldset>

      <!-- BOX 8 -->
      <fieldset class="box-group">
        <legend>{{ labels.box8.label }}</legend>
        <CheckItem v-model="survey.box8.financial_incentives" :label="labels.box8.financial_incentives" :description="descriptions.box8.financial_incentives" />
        <CheckItem v-model="survey.box8.taxi_service"         :label="labels.box8.taxi_service"         :description="descriptions.box8.taxi_service" />
        <CheckItem v-model="survey.box8.trip_advice"          :label="labels.box8.trip_advice"          :description="descriptions.box8.trip_advice" />
        <CheckItem v-model="survey.box8.flexibility"          :label="labels.box8.flexibility"          :description="descriptions.box8.flexibility" />
        <CheckItem v-model="survey.box8.teleworking"          :label="labels.box8.teleworking"          :description="descriptions.box8.teleworking" />
        <CheckItem v-model="survey.box8.mobility_office"      :label="labels.box8.mobility_office"      :description="descriptions.box8.mobility_office" />
        <CheckItem v-model="survey.box8.land_use"             :label="labels.box8.land_use"             :description="descriptions.box8.land_use" />
        <CheckItem v-model="survey.box8.e_shopping"           :label="labels.box8.e_shopping"           :description="descriptions.box8.e_shopping" />
        <CheckItem v-model="survey.box8.general_services"     :label="labels.box8.general_services"     :description="descriptions.box8.general_services" />
      </fieldset>

      <div class="d-flex gap-3 flex-wrap my-4">
        <button type="submit" class="btn btn-primary btn-lg">Salva</button>
        <NuxtLink :to="`/view/${survey.id}`" class="btn btn-secondary btn-lg">Visualizza etichetta</NuxtLink>
      </div>

      <div v-if="saved" class="alert alert-success">Salvataggio avvenuto correttamente.</div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
    </form>
  </div>
  <div v-else class="container my-4">
    <p>Questionario non trovato. <NuxtLink to="/">Torna alla lista</NuxtLink></p>
  </div>
</template>

<script setup lang="ts">
import type { Survey } from '~/composables/useMobilityLabel'

const route = useRoute()
const { getById, saveSurvey } = useMobilityLabel()

const survey = ref<Survey | undefined>(getById(route.params.id as string))
const saved = ref(false)
const error = ref('')

function onSubmit() {
  if (!survey.value) return
  try {
    saveSurvey(survey.value)
    saved.value = true
    error.value = ''
    setTimeout(() => { saved.value = false }, 3000)
  } catch (e: any) {
    error.value = e?.message ?? 'Errore durante il salvataggio'
  }
}

// ─── Labels ───────────────────────────────────────────────────────────────────
const labels = {
  box1: {
    label: 'BOX 1: Ciclabilità',
    accessible: '1.1 L\'azienda è accessibile in bici',
    theft_prevention: '1.2 Prevenzione dei furti di bici',
    arrival_bike: '1.3 Facilities per chi si sposta in bici',
    internal_bikes: '1.4 Biciclette aziendali - spostamenti all\'interno dell\'azienda e per lavoro',
    pool_bikes: '1.5 Biciclette aziendali - spostamenti per casa-lavoro e non',
    cycling_business_trips: '1.6 Ciclabilità per gli spostamenti per lavoro',
    internal_cycling: '1.7 Strutture e servizi per la ciclabilità presso la sede aziendale',
    cycling_infrast: '1.8 Collaborazione con gli enti per il miglioramento della rete ciclabile',
  },
  box2: {
    label: 'BOX 2: Pedonalità',
    azessible: '2.1 L\'azienda è accessibile a piedi',
    infrastructure_walk: '2.2 Infrastrutture sicure per pedoni',
    arrival_walk: '2.3 Facilities per chi si sposta a piedi',
  },
  box3: {
    label: 'BOX 3: Trasporto pubblico',
    bus_accessible: '3.1 L\'azienda è accessibile con il trasporto pubblico',
    bus_info: '3.2 Informazioni sul trasporto pubblico',
    co_financing: '3.3 Cofinanziamento dei biglietti di trasporto pubblico',
    bus_facilities: '3.4 Infrastrutture/servizi di trasporto pubblico nelle vicinanze',
    lobby: '3.5 Collaborazione con gli enti per il miglioramento del trasporto pubblico',
    bus_infrastructure: '3.6 Infrastrutture per i pedoni all\'interno della sede',
    shuttle_bus: '3.7 Navetta aziendale',
    vanpooling: '3.8 Vanpooling',
  },
  box4: {
    label: 'BOX 4: Carpooling',
    matching_service: '4.1 Formazione di equipaggi',
    parking_carpooling: '4.2 Posteggi per chi fa carpooling',
    carpooling_incentives: '4.3 Incentivi al carpooling',
  },
  box5: {
    label: 'BOX 5: Sharing Mobility',
    carsharing: '5.1 L\'azienda è servita dal car sharing',
    carsharing_convenzioni: '5.2 Facilitazioni car sharing per i dipendenti',
    bike_sharing: '5.3 L\'azienda è servita dal bike sharing',
    bike_sharing_convenzioni: '5.4 Facilitazioni bike sharing per i dipendenti',
    scooter_sharing: '5.5 L\'azienda è servita dallo scooter/moto sharing',
    scooter_sharing_convenzioni: '5.6 Facilitazioni scooter/moto sharing per i dipendenti',
    monopattini: '5.7 L\'azienda è servita da servizi di monopattini elettrici',
    monopattini_convenzioni: '5.8 Facilitazioni per l\'uso dei monopattini elettrici',
    incentives_sharing: '5.9 Incentivi per la sharing mobility',
  },
  box6: {
    label: 'BOX 6: Auto private/aziendali',
    accessibility: '6.1 Accessibilità in auto',
    business_trips: '6.2 Riduzione delle trasferte di lavoro',
    efficient_use_work: '6.3 Alternative all\'uso individuale dell\'auto per lavoro',
    sensible_car_use: '6.4 Flotta aziendale disponibile per i dipendenti',
    park_ride: '6.5 Park & ride (Posteggi di Interscambio)',
    parking_fee: '6.6 Sosta a pagamento',
    parking_management: '6.7 Gestione della sosta presso l\'azienda',
    car_free: '6.8 Car free areas',
    access_management: '6.9 Gestione dell\'accesso alla sede',
    vhl_restrictions: '6.10 Restrizioni per i veicoli più inquinanti',
    clean_vhls: '6.11 Flotta aziendale a basso impatto ambientale',
    alternative_fuels: '6.12 Promozione di combustibili alternativi',
    eco_driving: '6.13 Corsi di eco-drive',
    its: '6.14 Sistemi di trasporto intelligenti',
    route_planning: '6.15 Pianificazione dei percorsi',
    traffic_info: '6.16 Informazioni sul traffico',
  },
  box7: {
    label: 'BOX 7: Mobilità ridotta',
    accessibility_signs: '7.1 Wayfinding dedicato a persone con mobilità ridotta',
    infrastructure_mobility: '7.2 Sede accessibile per le persone con mobilità ridotta',
  },
  box8: {
    label: 'BOX 8: Ulteriori misure di mobilità',
    financial_incentives: '8.1 Incentivi economici',
    taxi_service: '8.2 Ritorno a casa garantito (servizio taxi)',
    trip_advice: '8.3 Servizio di consulenza individuale sugli spostamenti',
    flexibility: '8.4 Flessibilità di orario lavorativo',
    teleworking: '8.5 Smart working',
    mobility_office: '8.6 Sportello mobilità',
    land_use: '8.7 Sviluppo futuro e pianificazione degli spostamenti',
    e_shopping: '8.8 Abilitazione servizi e-commerce',
    general_services: '8.9 Fornitura di servizi aggiuntivi in loco',
  },
}

// ─── Descriptions ─────────────────────────────────────────────────────────────
const descriptions = {
  box1: {
    accessible: 'E\' possibile raggiungere l\'azienda in bici in modo sicuro e comodo.',
    theft_prevention: 'L\'azienda ha una chiara strategia e dispone di strutture per prevenire il furto di biciclette.',
    arrival_bike: 'L\'azienda dispone di spogliatoi, docce e armadietti per chi si sposta in bici.',
    internal_bikes: 'L\'azienda mette a disposizione biciclette per spostamenti interni e per lavoro.',
    pool_bikes: 'L\'azienda concede biciclette a comodato d\'uso ai dipendenti anche per spostamenti non lavorativi.',
    cycling_business_trips: 'L\'azienda promuove l\'uso della bicicletta per gli spostamenti operativi.',
    internal_cycling: 'E\' facile e sicuro spostarsi in bici all\'interno della sede.',
    cycling_infrast: 'L\'azienda collabora con le autorità locali per migliorare la rete ciclabile.',
  },
  box2: {
    azessible: 'L\'azienda è situata a meno di 2 km da aree abitate o fermate del trasporto pubblico.',
    infrastructure_walk: 'L\'azienda può essere raggiunta a piedi in sicurezza con marciapiedi e attraversamenti sicuri.',
    arrival_walk: 'L\'azienda dispone di spogliatoi, docce e armadietti per chi si sposta a piedi.',
  },
  box3: {
    bus_accessible: 'L\'azienda è facilmente raggiungibile con il trasporto pubblico con frequenze compatibili con gli orari dei dipendenti.',
    bus_info: 'L\'azienda fornisce informazioni aggiornate sul servizio di trasporto pubblico.',
    co_financing: 'L\'azienda cofinanzia almeno del 5% gli abbonamenti annuali per il trasporto pubblico.',
    bus_facilities: 'Presenza di fermate del trasporto pubblico con pensiline e strutture entro 10 minuti a piedi.',
    lobby: 'L\'azienda collabora con gli enti locali per promuovere politiche di trasporto pubblico.',
    bus_infrastructure: 'Gli spostamenti a piedi all\'interno della sede sono sicuri per l\'ultimo miglio.',
    shuttle_bus: 'L\'azienda ha un servizio di navetta per il collegamento con stazioni ferroviarie/metropolitana.',
    vanpooling: 'L\'azienda offre un servizio di vanpooling con furgoni propri o noleggiati.',
  },
  box4: {
    matching_service: 'L\'azienda facilita la formazione di equipaggi di carpooling con piattaforme online.',
    parking_carpooling: 'L\'azienda dispone di sosta riservata per chi fa carpooling.',
    carpooling_incentives: 'L\'azienda offre incentivi economici e/o non-economici per promuovere il carpooling.',
  },
  box5: {
    carsharing: 'La sede aziendale è servita da uno o più servizi di car sharing.',
    carsharing_convenzioni: 'L\'azienda ha stipulato convenzioni con gestori di car sharing.',
    bike_sharing: 'La sede aziendale è servita da uno o più servizi di bike sharing.',
    bike_sharing_convenzioni: 'L\'azienda ha stipulato convenzioni con gestori di bike sharing.',
    scooter_sharing: 'La sede aziendale è servita da uno o più servizi di scooter sharing.',
    scooter_sharing_convenzioni: 'L\'azienda ha stipulato convenzioni con gestori di scooter sharing.',
    monopattini: 'La sede aziendale è servita da uno o più servizi di monopattini elettrici.',
    monopattini_convenzioni: 'L\'azienda ha stipulato convenzioni con gestori di monopattini elettrici.',
    incentives_sharing: 'L\'azienda offre incentivi ai dipendenti per promuovere l\'utilizzo della sharing mobility.',
  },
  box6: {
    accessibility: 'L\'azienda è facilmente raggiungibile in auto.',
    business_trips: 'L\'azienda adotta politiche per ridurre il numero di viaggi per lavoro (es. teleconferenze).',
    efficient_use_work: 'L\'azienda promuove un uso più efficiente delle auto per gli spostamenti per lavoro.',
    sensible_car_use: 'L\'azienda possiede una flotta di veicoli messa a disposizione dei dipendenti.',
    park_ride: 'L\'azienda propone un servizio di Park&Ride ai dipendenti.',
    parking_fee: 'L\'azienda applica un sistema di pagamento della sosta presso la sede.',
    parking_management: 'L\'azienda adotta un piano di gestione della sosta in linea con la strategia di mobilità sostenibile.',
    car_free: 'Nelle aree di pertinenza della sede sono definite zone car-free.',
    access_management: 'L\'azienda favorisce l\'accesso alla sede di determinati tipi di trasporto.',
    vhl_restrictions: 'L\'azienda è in una zona con restrizioni di accesso in base alle emissioni dei veicoli.',
    clean_vhls: 'L\'azienda possiede una flotta a carburanti alternativi, elettrica o a bassa emissione.',
    alternative_fuels: 'L\'azienda ha una politica per incentivare veicoli con carburanti alternativi.',
    eco_driving: 'L\'azienda promuove l\'eco-drive con corsi dedicati.',
    its: 'L\'azienda utilizza sistemi di trasporto intelligenti per la flotta e per l\'area di pertinenza.',
    route_planning: 'L\'azienda utilizza navigatori con soluzioni multimodali (MaaS).',
    traffic_info: 'L\'azienda offre un servizio di informazioni sul traffico in tempo reale.',
  },
  box7: {
    accessibility_signs: 'L\'azienda ha sistemi di orientamento per persone con mobilità ridotta.',
    infrastructure_mobility: 'L\'azienda dispone di infrastrutture che garantiscono l\'accesso a persone con mobilità ridotta.',
  },
  box8: {
    financial_incentives: 'L\'azienda offre incentivi economici ai dipendenti che si spostano con mezzi sostenibili.',
    taxi_service: 'L\'azienda offre un servizio di ritorno a casa garantito per chi usa mezzi sostenibili.',
    trip_advice: 'L\'azienda offre consulenza personale per la pianificazione degli spostamenti casa-lavoro.',
    flexibility: 'I dipendenti hanno orari di lavoro flessibili.',
    teleworking: 'I dipendenti hanno la possibilità di fare smart working.',
    mobility_office: 'La società ha uno Sportello Mobilità per facilitare la mobilità sostenibile.',
    land_use: 'Il tema della mobilità sostenibile è presente nella pianificazione futura.',
    e_shopping: 'L\'azienda offre servizi e-commerce dedicati ai dipendenti.',
    general_services: 'I dipendenti possono usufruire di servizi in loco (asilo nido, farmacia, lavanderia, ecc.).',
  },
}
</script>
