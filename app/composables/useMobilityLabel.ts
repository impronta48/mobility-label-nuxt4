export interface Survey {
  id: string
  company_name: string
  office_name: string
  year: number
  box1: {
    accessible: number
    theft_prevention: number
    arrival_bike: number
    internal_bikes: number
    pool_bikes: number
    cycling_business_trips: number
    internal_cycling: number
    cycling_infrast: number
  }
  box2: {
    azessible: number
    infrastructure_walk: number
    arrival_walk: number
  }
  box3: {
    bus_accessible: number
    bus_info: number
    co_financing: number
    bus_facilities: number
    lobby: number
    bus_infrastructure: number
    shuttle_bus: number
    vanpooling: number
  }
  box4: {
    matching_service: number
    parking_carpooling: number
    carpooling_incentives: number
  }
  box5: {
    carsharing: number
    carsharing_convenzioni: number
    bike_sharing: number
    bike_sharing_convenzioni: number
    scooter_sharing: number
    scooter_sharing_convenzioni: number
    monopattini: number
    monopattini_convenzioni: number
    incentives_sharing: number
  }
  box6: {
    accessibility: number
    business_trips: number
    efficient_use_work: number
    sensible_car_use: number
    park_ride: number
    parking_fee: number
    parking_management: number
    car_free: number
    access_management: number
    vhl_restrictions: number
    clean_vhls: number
    alternative_fuels: number
    eco_driving: number
    its: number
    route_planning: number
    traffic_info: number
  }
  box7: {
    accessibility_signs: number
    infrastructure_mobility: number
  }
  box8: {
    financial_incentives: number
    taxi_service: number
    trip_advice: number
    flexibility: number
    teleworking: number
    mobility_office: number
    land_use: number
    e_shopping: number
    general_services: number
  }
}

export interface LabelResult {
  box1: number; box2: number; box3: number; box4: number
  box5: number; box6: number; box7: number; box8: number
  total: number
  class1: string; class2: string; class3: string; class4: string
  class5: string; class6: string; class7: string; class8: string
  class_total: string
}

const STORAGE_KEY = 'mobility-label-surveys'

function emptyBoxes(): Omit<Survey, 'id' | 'company_name' | 'office_name' | 'year'> {
  return {
    box1: { accessible: 0, theft_prevention: 0, arrival_bike: 0, internal_bikes: 0, pool_bikes: 0, cycling_business_trips: 0, internal_cycling: 0, cycling_infrast: 0 },
    box2: { azessible: 0, infrastructure_walk: 0, arrival_walk: 0 },
    box3: { bus_accessible: 0, bus_info: 0, co_financing: 0, bus_facilities: 0, lobby: 0, bus_infrastructure: 0, shuttle_bus: 0, vanpooling: 0 },
    box4: { matching_service: 0, parking_carpooling: 0, carpooling_incentives: 0 },
    box5: { carsharing: 0, carsharing_convenzioni: 0, bike_sharing: 0, bike_sharing_convenzioni: 0, scooter_sharing: 0, scooter_sharing_convenzioni: 0, monopattini: 0, monopattini_convenzioni: 0, incentives_sharing: 0 },
    box6: { accessibility: 0, business_trips: 0, efficient_use_work: 0, sensible_car_use: 0, park_ride: 0, parking_fee: 0, parking_management: 0, car_free: 0, access_management: 0, vhl_restrictions: 0, clean_vhls: 0, alternative_fuels: 0, eco_driving: 0, its: 0, route_planning: 0, traffic_info: 0 },
    box7: { accessibility_signs: 0, infrastructure_mobility: 0 },
    box8: { financial_incentives: 0, taxi_service: 0, trip_advice: 0, flexibility: 0, teleworking: 0, mobility_office: 0, land_use: 0, e_shopping: 0, general_services: 0 },
  }
}

function getClassFromScore(score: number): string {
  if (score > 86.99) return 'A++'
  if (score > 71.99) return 'A+'
  if (score > 57.99) return 'A'
  if (score > 43.99) return 'B'
  if (score > 29.99) return 'C'
  if (score > 14.99) return 'D'
  return 'G'
}

export function calculateLabel(s: Survey): LabelResult {
  const box1 =
    s.box1.accessible * 26.3 +
    s.box1.theft_prevention * 14.1 +
    s.box1.arrival_bike * 11.7 +
    s.box1.internal_bikes * 4.7 +
    s.box1.pool_bikes * 11.6 +
    s.box1.cycling_business_trips * 6.0 +
    s.box1.internal_cycling * 10.0 +
    s.box1.cycling_infrast * 15.6

  const box2 =
    s.box2.azessible * 34.5 +
    s.box2.arrival_walk * 38 +
    s.box2.infrastructure_walk * 27.5

  const box3 =
    s.box3.bus_accessible * 34 +
    s.box3.bus_info * 12 +
    s.box3.co_financing * 14 +
    s.box3.bus_facilities * 4 +
    s.box3.lobby * 8 +
    s.box3.bus_infrastructure * 2 +
    s.box3.shuttle_bus * 23 +
    s.box3.vanpooling * 3

  const box4 =
    s.box4.matching_service * 33.4 +
    s.box4.parking_carpooling * 33.3 +
    s.box4.carpooling_incentives * 33.3

  const box5 =
    (s.box5.carsharing || 0) * 13.0 +
    (s.box5.carsharing_convenzioni || 0) * 11.0 +
    (s.box5.bike_sharing || 0) * 11.0 +
    (s.box5.bike_sharing_convenzioni || 0) * 9.0 +
    (s.box5.scooter_sharing || 0) * 10.0 +
    (s.box5.scooter_sharing_convenzioni || 0) * 8.0 +
    (s.box5.monopattini || 0) * 10.0 +
    (s.box5.monopattini_convenzioni || 0) * 8.0 +
    (s.box5.incentives_sharing || 0) * 20.0

  const box6 =
    s.box6.accessibility * 1.4 +
    s.box6.business_trips * 8.6 +
    s.box6.efficient_use_work * 5.6 +
    s.box6.sensible_car_use * 2.8 +
    s.box6.park_ride * 7.4 +
    s.box6.parking_fee * 5.9 +
    s.box6.parking_management * 14.4 +
    s.box6.car_free * 7.3 +
    s.box6.access_management * 7.3 +
    s.box6.vhl_restrictions * 7.3 +
    s.box6.clean_vhls * 2.9 +
    s.box6.alternative_fuels * 8.8 +
    s.box6.eco_driving * 8.8 +
    s.box6.its * 2.8 +
    s.box6.route_planning * 4.5 +
    s.box6.traffic_info * 4.2

  const box7 =
    s.box7.accessibility_signs * 50 +
    s.box7.infrastructure_mobility * 50

  const box8 =
    s.box8.financial_incentives * 20.0 +
    s.box8.taxi_service * 6.5 +
    s.box8.trip_advice * 9.0 +
    (s.box8.flexibility || 0) * 14.5 +
    s.box8.teleworking * 11 +
    s.box8.mobility_office * 16.0 +
    s.box8.land_use * 5.0 +
    s.box8.e_shopping * 7.5 +
    s.box8.general_services * 10.5

  const total = box1 + box2 + box3 + box4 + box5 + box6 + box7 + box8

  let class_total: string
  if (total > 707) class_total = 'A+++'
  else if (total > 615.99) class_total = 'A++'
  else if (total > 524.99) class_total = 'A+'
  else if (total > 399.99) class_total = 'A'
  else if (total > 299.99) class_total = 'B'
  else if (total > 224.99) class_total = 'C'
  else if (total > 149.99) class_total = 'D'
  else if (total > 99.99) class_total = 'E'
  else if (total > 49.99) class_total = 'F'
  else class_total = 'G'

  return {
    box1, box2, box3, box4, box5, box6, box7, box8, total,
    class1: getClassFromScore(box1),
    class2: getClassFromScore(box2),
    class3: getClassFromScore(box3),
    class4: getClassFromScore(box4),
    class5: getClassFromScore(box5),
    class6: getClassFromScore(box6),
    class7: getClassFromScore(box7),
    class8: getClassFromScore(box8),
    class_total,
  }
}

export const CLASS_COLORS: Record<string, string> = {
  'A+++': '#23a650',
  'A++':  '#50b848',
  'A+':   '#bed731',
  'A':    '#fced22',
  'B':    '#f9b817',
  'C':    '#f37122',
  'D':    '#ec2127',
  'E':    '#ec2127',
  'F':    '#ec2127',
  'G':    '#ec2127',
}

export function useMobilityLabel() {
  function loadAll(): Survey[] {
    if (!import.meta.client) return []
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  }

  function saveAll(surveys: Survey[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys))
  }

  function getById(id: string): Survey | undefined {
    return loadAll().find(s => s.id === id)
  }

  function createSurvey(company_name: string, office_name: string, year: number): Survey {
    const survey: Survey = {
      id: crypto.randomUUID(),
      company_name,
      office_name,
      year,
      ...emptyBoxes(),
    }
    const all = loadAll()
    all.push(survey)
    saveAll(all)
    return survey
  }

  function saveSurvey(survey: Survey) {
    const all = loadAll()
    const idx = all.findIndex(s => s.id === survey.id)
    if (idx >= 0) all[idx] = survey
    else all.push(survey)
    saveAll(all)
  }

  function deleteSurvey(id: string) {
    saveAll(loadAll().filter(s => s.id !== id))
  }

  return { loadAll, getById, createSurvey, saveSurvey, deleteSurvey }
}
