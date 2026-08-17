<script setup>
import { computed, onBeforeUnmount, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import ModelViewer from '../components/ModelViewer.vue'
import proga2Model from '../assets/3dmodels/proga2.glb'
import testnaProgaModel from '../assets/3dmodels/testnaproga.glb'

const DOVOLJENA_STEVILA = [4, 7, 10]

const router = useRouter()

const podatkiProg = [
  {
    ime: 'Bobi',
    opis: 'Polna odbojnih blazin, ki žogo poganjajo v nepričakovane smeri. Natančnost je tu pomembnejša od moči.',
  },
  {
    ime: 'Roli',
    opis: 'Dolg zavit tok proge zahteva mehak, valujoč udarec. Prehitra žoga zdrsne mimo cilja.',
  },
  {
    ime: 'Kucl',
    opis: 'Kratka in ozka proga, kjer šteje en sam natančen sunek. Idealna za tiste, ki imajo radi izzive na dotik.',
  },
  {
    ime: 'Vijugi',
    opis: 'Serpentina ovinkov, ki vijuga levo in desno. Zahteva potrpežljivost in dober občutek za kote.',
  },
  {
    ime: 'Zavojc',
    opis: 'Oster pravokoten zavoj sredi proge preizkusi vaš nadzor nad žogo. En napačen udarec in začnete znova.',
  },
  {
    ime: 'Skočko',
    opis: 'Proga z rampami in višinskimi razlikami, kjer žoga poskakuje čez ovire. Zabavna, a nepredvidljiva.',
  },
  {
    ime: 'Driblc',
    opis: 'Med stožci in ovirami je treba žogo spretno voditi, tako kot pri driblanju na igrišču.',
  },
  {
    ime: 'Fintek',
    opis: 'Videz vara – navidezna bližnjica vodi stran od cilja. Tu se izplača razmisliti pred udarcem.',
  },
  {
    ime: 'Cofko',
    opis: 'Vrteč se ovira na sredini proge poskrbi, da vsak poskus izgleda malo drugače. Timing je ključen.',
  },
  {
    ime: 'Špical',
    opis: 'Ozek zaključni del proge se konča v tesnem cilju. Zadnji udarci so vedno najbolj napeti.',
  },
]

const proge = reactive(
  Array.from({ length: 10 }, (_, i) => ({
    stevilka: i + 1,
    ime: podatkiProg[i].ime,
    tezavnost: Math.floor(Math.random() * 5) + 1,
    opis: podatkiProg[i].opis,
    slika: null,
    model: i === 0 ? testnaProgaModel : proga2Model,
    zanima: false,
    koti: i % 2 === 0 ? ['top right', 'bottom right'] : ['top left', 'bottom left'],
    mocOsvetlitve: 0.08,
    vidno: false,
  }))
)

const steviloIzbranih = computed(() => proge.filter((p) => p.zanima).length)
const veljavnaIzbira = computed(() => DOVOLJENA_STEVILA.includes(steviloIzbranih.value))

const modelRefs = {}
function setModelRef(el, stevilka) {
  if (el) modelRefs[stevilka] = el
  else delete modelRefs[stevilka]
}

let observer
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const stevilka = Number(entry.target.dataset.stevilka)
        const proga = proge.find((p) => p.stevilka === stevilka)
        if (proga) proga.vidno = entry.isIntersecting
      }
    },
    { rootMargin: '400px 0px' }
  )
  Object.values(modelRefs).forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())

function posljiPovprasevanje() {
  if (!veljavnaIzbira.value) return

  const izbrane = proge.filter((p) => p.zanima).map((p) => p.stevilka)
  localStorage.setItem('izbrane-proge', JSON.stringify(izbrane))
  router.push('/kontakt')
}
</script>

<template>
  <section class="bg-page-gradient min-h-[calc(100vh-76px)] pt-19">
    <div class="mx-auto max-w-295 px-6 py-20 md:py-28">
      <p class="mb-3 text-center text-sm font-bold tracking-widest text-primary-dark uppercase md:text-left">
        Naše proge
      </p>
      <h1 class="mb-4 text-center text-4xl font-black text-dark md:text-left md:text-5xl">Predstavitev prog</h1>
      <span class="mx-auto mb-16 block h-1 w-14 rounded-full bg-linear-to-r from-primary to-primary-dark md:mx-0"></span>

      <div class="flex flex-col gap-16 md:gap-24">
        <article
          v-for="(proga, index) in proge"
          :key="proga.stevilka"
          class="flex flex-col items-center gap-8 rounded-[2.5rem] p-6 md:flex-row md:gap-14 md:p-8"
          :class="{ 'md:flex-row-reverse': index % 2 === 1 }"
          :style="{
            background: proga.koti
              .map(
                (kot) =>
                  `radial-gradient(ellipse at ${kot}, rgba(107,117,112,${proga.mocOsvetlitve}) 0%, rgba(107,117,112,0) 60%)`
              )
              .join(', '),
          }"
        >
          <div class="-mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-3/5">
            <img
              v-if="proga.slika"
              :src="proga.slika"
              :alt="proga.ime"
              class="aspect-square w-full rounded-2xl object-cover md:aspect-video"
            />
            <div
              v-else
              class="aspect-square w-full overflow-hidden rounded-2xl md:aspect-video"
              :class="{ 'bg-light': !proga.vidno }"
              :data-stevilka="proga.stevilka"
              :ref="(el) => setModelRef(el, proga.stevilka)"
            >
              <ModelViewer v-if="proga.vidno" :model="proga.model" :scale="0.98" class="h-full w-full" />
            </div>
          </div>

          <div class="w-full md:w-2/5">
            <span
              class="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-black text-white"
            >
              {{ proga.stevilka }}
            </span>
            <h2 class="mb-2 text-2xl font-extrabold text-dark md:text-3xl">{{ proga.ime }}</h2>
            <div class="mb-4 flex items-center gap-1" :aria-label="`Težavnost: ${proga.tezavnost} od 5`">
              <span
                v-for="n in 5"
                :key="n"
                class="text-2xl leading-none"
                :class="n <= proga.tezavnost ? 'text-primary' : 'text-dark/15'"
                aria-hidden="true"
                >★</span
              >
            </div>
            <p class="mb-4 text-lg leading-relaxed text-muted">{{ proga.opis }}</p>

            <label class="inline-flex cursor-pointer items-center gap-2.5 text-base font-semibold text-dark">
              <input
                v-model="proga.zanima"
                type="checkbox"
                class="h-5 w-5 rounded-sm border-dark/25 text-primary accent-primary focus:outline-2 focus:outline-primary focus:outline-offset-1"
              />
              Zanima me
            </label>
          </div>
        </article>
      </div>

      <div class="mt-16 flex flex-col items-center gap-3 text-center md:mt-24">
        <button
          type="button"
          :disabled="!veljavnaIzbira"
          class="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-bold text-white shadow-[0_8px_24px_-8px_rgba(109,177,101,0.6)] transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40"
          @click="posljiPovprasevanje"
        >
          Pošlji povpraševanje
        </button>
        <p class="text-sm text-muted">
          Izbrati morate natanko 4, 7 ali 10 prog (kot v naših paketih). Trenutno izbranih: {{ steviloIzbranih }}.
        </p>
      </div>
    </div>
  </section>
</template>
