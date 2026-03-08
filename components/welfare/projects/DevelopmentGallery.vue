<template>
  <!-- Development Gallery Section -->
  <section id="development-gallery" class="py-10 bg-white border-t border-gray-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">

      <!-- Section Header -->
      

      <!-- Empty State -->
      <div
        v-if="!stages.length"
        class="flex flex-col items-center justify-center py-20 text-gray-400"
      >
        <svg class="w-12 h-12 mb-3 opacity-40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3l18 18" />
        </svg>
        <p class="text-base font-medium">{{ t.noGallery }}</p>
      </div>

      <!-- Gallery Layout -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

        <!-- Desktop Left Panel -->
        <div class="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div class="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-sm sticky top-20">
            <h3 class="text-lg font-bold text-gray-900">{{ t.projectStages }}</h3>
            <p class="text-sm text-gray-500 mt-1 mb-4">{{ t.stageSelectHint }}</p>
            <div class="space-y-2">
              <button
                v-for="stage in stages"
                :key="stage.name"
                @click="selectStage(stage.name)"
                class="w-full text-left rounded-xl px-4 py-3 transition border"
                :style="activeStage === stage.name
                  ? 'background:#2B4DAE;border-color:#2B4DAE;color:white;box-shadow:0 4px 12px rgba(43,77,174,0.25)'
                  : 'background:white;border-color:#e5e7eb;color:#1f2937'"
              >
                <div class="flex items-center justify-between gap-3">
                  <span class="font-semibold text-sm">{{ stage.name }}</span>
                  <span
                    class="text-xs rounded-full px-2 py-0.5 font-semibold"
                    :style="activeStage === stage.name
                      ? 'background:rgba(255,255,255,0.2);color:white'
                      : 'background:#f3f4f6;color:#6b7280'"
                  >
                    {{ stage.images.length }}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div class="lg:col-span-8 xl:col-span-9">
          <div class="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">

            <!-- Mobile Dropdown -->
            <div class="lg:hidden p-4 border-b border-gray-200 bg-gray-50">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                {{ t.selectStage }}
              </label>
              <div class="relative">
                <select
                  v-model="activeStage"
                  @change="onDropdownChange"
                  class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-800 outline-none appearance-none"
                >
                  <option v-for="stage in stages" :key="stage.name" :value="stage.name">
                    {{ stage.name }} ({{ stage.images.length }})
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Top Info Bar -->
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-3 border-b border-gray-200"
              style="background:linear-gradient(to right,#eef1fb,#f0fdf4)"
            >
              <div>
                <p class="text-xs sm:text-sm font-semibold" style="color:#2B4DAE">
                  {{ t.currentStageLabel }}
                </p>
                <h3 class="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                  {{ activeStage }}
                </h3>
              </div>
              <div class="flex items-center gap-3">
                <div class="rounded-xl bg-white border border-gray-200 px-4 py-2 shadow-sm min-w-[90px] text-center">
                  <p class="text-[11px] sm:text-xs text-gray-500">{{ t.photos }}</p>
                  <p class="text-base sm:text-lg font-bold text-gray-900">{{ activeImages.length }}</p>
                </div>
                <!-- "In Progress" badge for the current development stage -->
                <div
                  v-if="activeStage === currentDevelopment"
                  class="rounded-xl px-3 py-2 text-center"
                  style="background:#5BBB6F"
                >
                  <p class="text-xs font-bold text-white leading-tight">{{ t.currentBadge }}</p>
                </div>
              </div>
            </div>

            <!-- Image Slider -->
            <div class="relative">
              <div
                class="relative w-full overflow-hidden bg-gray-100"
                style="aspect-ratio:16/9;max-height:360px"
              >
                <template v-if="activeImages.length">
                  <div
                    v-for="(url, index) in activeImages"
                    :key="index"
                    class="absolute inset-0 transition-opacity duration-700"
                    :style="{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 10 : 0 }"
                  >
                    <img
                      :src="url"
                      :alt="`${activeStage} ${index + 1}`"
                      class="w-full h-full object-cover"
                    />
                    <div
                      class="absolute inset-0"
                      style="background:linear-gradient(to top,rgba(0,0,0,0.65) 0%,rgba(0,0,0,0.12) 50%,transparent 100%)"
                    ></div>
                    <div class="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <p class="text-[11px] sm:text-xs uppercase tracking-wider" style="color:rgba(255,255,255,0.8)">{{ t.devStage }}</p>
                      <h4 class="text-lg sm:text-2xl font-bold mt-1">{{ activeStage }}</h4>
                      <p class="mt-1 text-xs sm:text-sm" style="color:rgba(255,255,255,0.85)">
                        {{ t.photo }} {{ index + 1 }} {{ t.of }} {{ activeImages.length }}
                      </p>
                    </div>
                  </div>
                </template>

                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-gray-500 text-base font-medium"
                >
                  {{ t.noImages }}
                </div>
              </div>

              <!-- Prev -->
              <button
                v-if="activeImages.length > 1"
                @click="prevSlide"
                class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 flex items-center justify-center z-20 transition"
              >
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Next -->
              <button
                v-if="activeImages.length > 1"
                @click="nextSlide"
                class="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white shadow-md border border-gray-200 flex items-center justify-center z-20 transition"
              >
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Dots -->
              <div
                v-if="activeImages.length > 1"
                class="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
              >
                <button
                  v-for="(_, index) in activeImages"
                  :key="index"
                  @click="goToSlide(index)"
                  class="rounded-full transition"
                  :style="index === currentSlide
                    ? 'width:11px;height:11px;background:white;transform:scale(1.15)'
                    : 'width:10px;height:10px;background:rgba(255,255,255,0.5)'"
                ></button>
              </div>
            </div>

            <!-- Thumbnails -->
            <div
              v-if="activeImages.length"
              class="p-2 sm:p-3 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 gap-2 bg-gray-50 border-t border-gray-200"
            >
              <button
                v-for="(url, index) in activeImages"
                :key="index"
                @click="goToSlide(index)"
                class="relative rounded-xl overflow-hidden border-2 transition"
                :style="index === currentSlide
                  ? 'border-color:#2B4DAE;box-shadow:0 2px 8px rgba(43,77,174,0.3)'
                  : 'border-color:transparent'"
              >
                <img
                  :src="url"
                  :alt="`Thumb ${index + 1}`"
                  class="w-full object-cover"
                  style="height:64px"
                />
                <div
                  v-if="index === currentSlide"
                  class="absolute inset-0 flex items-center justify-center"
                  style="background:rgba(43,77,174,0.15)"
                >
                  <svg class="w-5 h-5 text-white drop-shadow" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useProjectStore } from '~/stores/modules/welfare/projects/projectStore'

// ── Props ─────────────────────────────────────────────────────
const props = defineProps({
  langCode: { type: Number, default: 100 }
})

// ── Store ─────────────────────────────────────────────────────
const projectStore = useProjectStore()

// ── Translations ──────────────────────────────────────────────
const translations = {
  si: {
    constructionProgress: 'ඉදිකිරීම් ප්‍රගතිය',
    galleryTitle:         'සංවර්ධන ගැලරිය',
    galleryDesc:          'සෑම ඉදිකිරීම් අදියරකම ඡායාරූප බලන්න.',
    projectStages:        'ව්‍යාපෘති අදියර',
    stageSelectHint:      'ඡායාරූප බැලීමට අදියරක් තෝරන්න',
    selectStage:          'සංවර්ධන කොටස තෝරන්න',
    currentStageLabel:    'වත්මන් සංවර්ධන අදියර',
    photos:               'ඡායාරූප',
    currentBadge:         'දැනට සිදු වෙමින්',
    devStage:             'සංවර්ධන අදියර',
    photo:                'ඡායාරූප',
    of:                   'සිට',
    noImages:             'මෙම කොටසේ ඡායාරූප නොමැත',
    noGallery:            'ගැලරිය ලබා ගත නොහැකි විය',
  },
  en: {
    constructionProgress: 'Construction Progress',
    galleryTitle:         'Development Gallery',
    galleryDesc:          'View photos from each construction stage.',
    projectStages:        'Project Stages',
    stageSelectHint:      'Select a stage to view its images',
    selectStage:          'Select Development Section',
    currentStageLabel:    'Current Development Stage',
    photos:               'Photos',
    currentBadge:         'In Progress',
    devStage:             'Development Stage',
    photo:                'Photo',
    of:                   'of',
    noImages:             'No images available for this section',
    noGallery:            'Gallery not available',
  }
}

const t = computed(() => props.langCode === 200 ? translations.en : translations.si)

// ── Data from store (populated by GetProjectInit, URLs already resolved) ──
const stages             = computed(() => projectStore.projectInit.gallery || [])
const currentDevelopment = computed(() => projectStore.projectInit.currentDevelopment || '')

// ── Active stage ──────────────────────────────────────────────
const activeStage  = ref('')
const currentSlide = ref(0)
let   autoSlideTimer = null

// Auto-select stage once gallery data lands in the store
watch(stages, (newStages) => {
  if (!newStages.length) return
  // Keep existing selection if still valid
  if (activeStage.value && newStages.find(s => s.name === activeStage.value)) return
  const match = newStages.find(s => s.name === currentDevelopment.value)
  activeStage.value  = match ? match.name : newStages[0].name
  currentSlide.value = 0
  restartAutoSlide()
}, { immediate: true })

const activeImages = computed(() => {
  const found = stages.value.find(s => s.name === activeStage.value)
  return found ? found.images : []
})

// ── Controls ──────────────────────────────────────────────────
function goToSlide(index)  { currentSlide.value = index; restartAutoSlide() }
function nextSlide()       { if (!activeImages.value.length) return; currentSlide.value = (currentSlide.value + 1) % activeImages.value.length }
function prevSlide()       { if (!activeImages.value.length) return; currentSlide.value = (currentSlide.value - 1 + activeImages.value.length) % activeImages.value.length }
function selectStage(name) { if (activeStage.value === name) return; activeStage.value = name; currentSlide.value = 0; restartAutoSlide() }
function onDropdownChange(){ currentSlide.value = 0; restartAutoSlide() }

watch(activeStage, () => { currentSlide.value = 0 })

function startAutoSlide()   { clearInterval(autoSlideTimer); autoSlideTimer = setInterval(nextSlide, 3500) }
function restartAutoSlide() { startAutoSlide() }

onMounted(() => { startAutoSlide() })
onBeforeUnmount(() => { clearInterval(autoSlideTimer) })
</script>