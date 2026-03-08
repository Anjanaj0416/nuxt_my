<template>
  <section class="bg-gray-50 text-gray-900 min-h-screen">

    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="'/walfare/Logo.jpeg'" alt="Welfare Society Logo" class="h-12 w-auto" />
          <div>
            <div class="font-bold text-blue-800 leading-tight text-base">{{ projectStore.projectInit.welfareName }}</div>
            <div class="text-xs text-green-600 leading-tight font-medium">{{ t.regLabel }}: {{ projectStore.projectInit.registrationNo }}</div>
          </div>
        </div>

        <!-- Right side: Language selector + Donate + Share -->
        <div class="flex items-center gap-2">

          <!-- ── Language Selector Dropdown ── -->
          <div class="relative" ref="langDropdownRef">
            <button
              @click="isLangOpen = !isLangOpen"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-white text-blue-800 text-xs font-bold transition-all duration-200 select-none hover:border-blue-300 hover:bg-blue-50"
              style="min-width:108px;"
            >
              <svg class="w-3.5 h-3.5 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
              </svg>
              <span class="flex-1 text-left">{{ currentLangLabel }}</span>
              <svg
                class="w-3 h-3 flex-shrink-0 transition-transform duration-200 text-blue-800"
                :style="isLangOpen ? 'transform:rotate(180deg)' : ''"
                fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 scale-95 -translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 -translate-y-1"
            >
              <div
                v-if="isLangOpen"
                class="absolute right-0 mt-2 w-36 rounded-2xl overflow-hidden shadow-2xl border border-blue-100 bg-white z-50"
                style="top:100%;"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="selectLang(lang)"
                  class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold transition-all duration-150"
                  :class="currentLang.code === lang.code ? 'bg-blue-50 text-blue-800' : 'text-gray-600 hover:bg-gray-50'"
                >
                  <span class="w-1.5 h-1.5 rounded-full flex-shrink-0" :class="currentLang.code === lang.code ? 'bg-green-600' : 'bg-transparent'"></span>
                  {{ lang.label }}
                  <span class="ml-auto text-xs opacity-40">{{ lang.native }}</span>
                </button>
                <div class="border-t border-blue-50 mx-3"></div>
              </div>
            </transition>
          </div>
          <!-- ── End Language Selector ── -->

          <a href="#donate" class="hidden sm:inline-flex rounded-xl px-5 py-2 text-white text-sm font-semibold" style="background:#5BBB6F">{{ t.donate }}</a>
          <button @click="handleShare" class="inline-flex rounded-xl border px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">{{ t.share }}</button>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <section class="bg-white border-b">
      <div class="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img :src="'/walfare/Logo.jpeg'" alt="Welfare Society Logo" class="h-14 w-auto" />
            <div>
              <div class="text-3xl font-bold text-blue-800">{{ projectStore.projectInit.welfareName }}</div>
              <div class="text-lg font-semibold text-green-600">{{ t.regLabel }}: {{ projectStore.projectInit.registrationNo }}</div>
            </div>
          </div>
          <p class="mt-2 text-gray-600">
            {{ t.heroDesc1 }} <b>LKR {{ SHARE_PRICE.toLocaleString() }}</b>. {{ t.heroDesc2 }}
          </p>
          <div class="mt-6 flex gap-2">
            <a href="#donate" class="rounded-xl px-4 py-2 sm:px-5 sm:py-3 text-white font-semibold text-sm sm:text-base" style="background:#5BBB6F">{{ t.donateNow }}</a>
            <a href="#breakdown" class="rounded-xl border px-4 py-2 sm:px-5 sm:py-3 font-semibold text-gray-700 text-sm sm:text-base hover:bg-gray-50">{{ t.viewBreakdown }}</a>
          </div>
          <div class="mt-6 grid sm:grid-cols-3 gap-3">
            <div class="rounded-2xl border bg-white p-4">
              <div class="text-xs text-gray-500">{{ t.oneShare }}</div>
              <div class="text-lg font-bold text-blue-800">LKR {{ SHARE_PRICE.toLocaleString() }}</div>
            </div>
            <div class="rounded-2xl border bg-white p-4">
              <div class="text-xs text-gray-500">{{ t.contact }}</div>
              <div class="text-sm font-semibold text-green-600">{{ t.secTreas }}</div>
            </div>
            <div class="rounded-2xl border bg-white p-4">
              <div class="text-xs text-gray-500">{{ t.transparency }}</div>
              <div class="text-sm font-semibold text-green-600">{{ t.plansUpdates }}</div>
            </div>
          </div>
        </div>

        <!-- Stats card -->
        <div class="rounded-2xl border bg-white shadow-sm p-6">
          <div class="text-sm text-gray-500 font-medium">{{ t.quickStats }}</div>
          <div class="mt-4 grid grid-cols-2 gap-3">
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">{{ t.totalCostLabel }}</div>
              <div class="font-bold text-green-600 text-lg">{{ lkr(totalCost) }}</div>
            </div>
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">{{ t.totalShares }}</div>
              <div class="font-bold text-blue-800 text-lg">{{ totalShares }}</div>
            </div>
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">{{ t.collectedShares }}</div>
              <div class="font-bold text-green-600 text-lg">{{ collectedShares }}</div>
            </div>
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">{{ t.remainingShares }}</div>
              <div class="font-bold text-blue-800 text-lg">{{ remainingShares }}</div>
            </div>
          </div>
          <div class="mt-5">
            <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: Math.min(overallPercent, 100) + '%' }"></div>
            </div>
            <div class="mt-2 text-xs text-gray-500">{{ overallPercent.toFixed(0) }}% {{ t.funded }}</div>
          </div>
          <div class="mt-5 rounded-xl p-4 text-sm text-blue-900" style="background:#eef1fb">
            <div class="font-bold text-blue-800">{{ t.bankDetails }}</div>
            <div class="mt-1">{{ projectStore.projectInit.bankDetails || t.bankPlaceholder }}</div>
            <div class="mt-2 text-xs text-gray-500">{{ t.bankNote }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan + Donate -->
    <section class="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b" style="background:#eef1fb">
          <h2 class="text-lg font-bold text-blue-800">{{ t.buildingPlan }}</h2>
          <p class="text-sm text-gray-600">{{ t.buildingPlanDesc }}</p>
        </div>
        <div class="p-6">
          <div class="relative rounded-xl overflow-hidden bg-white border" style="aspect-ratio:16/9">
            <template v-for="(slide, i) in planSlides" :key="i">
              <img v-if="planIndex === i" :src="slide.src" :alt="slide.label" class="w-full h-full object-contain" />
            </template>
            <button @click="planPrev" class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white shadow" style="background:#2B4DAE">&#8592;</button>
            <button @click="planNext" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white shadow" style="background:#2B4DAE">&#8594;</button>
            <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              <button v-for="(s, i) in planSlides" :key="i" @click="planIndex = i" class="rounded-full transition-all duration-300"
                :style="planIndex === i ? 'width:22px;height:8px;background:#2B4DAE' : 'width:8px;height:8px;background:#9ca3af'"></button>
            </div>
          </div>
          <div class="mt-2 text-center">
            <span class="inline-block rounded-lg px-4 py-1 text-sm font-semibold text-white" style="background:#2B4DAE">{{ planSlides[planIndex].label }}</span>
          </div>
          <div class="flex flex-row justify-between mt-5">
            <div>
              <div class="font-bold text-green-600">{{ t.downloads }}</div>
              <div class="mt-2 space-y-2">
                <a class="block text-blue-700 font-semibold hover:underline" href="#" @click.prevent>{{ t.buildingPlanPdf }}</a>
                <a class="block text-blue-700 font-semibold hover:underline" href="#" @click.prevent>{{ t.costEstimatePdf }}</a>
                <a class="block text-blue-700 font-semibold hover:underline" href="#" @click.prevent>{{ t.monthlyUpdates }}</a>
              </div>
            </div>
            <div class="rounded-xl border p-4 text-sm w-1/2 text-gray-700">
              <div><b>{{ t.secretary }}:</b> {{ projectStore.projectInit.secretaryContact || '07X XXX XXXX' }}</div>
              <div><b>{{ t.treasurer }}:</b> {{ projectStore.projectInit.treasurerContact || '07X XXX XXXX' }}</div>
              <div class="mt-2"><b>{{ t.location }}:</b> {{ projectStore.projectInit.location || t.locationPlaceholder }}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="donate" class="rounded-2xl border bg-white shadow-sm p-6">
        <h3 class="text-lg font-bold text-blue-800">{{ t.donateByShares }}</h3>
        <p class="text-sm text-gray-600 mt-1">{{ t.donateDesc }} <b>LKR {{ SHARE_PRICE.toLocaleString() }}</b>.</p>
        <div class="mt-5 grid gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">{{ t.fullName }}</label>
            <input v-model="donateForm.name" type="text" :placeholder="t.fullNamePlaceholder"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <p v-if="donateErr.name" class="mt-1 text-xs text-red-500">{{ donateErr.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">{{ t.contactNumber }}</label>
            <input v-model="donateForm.contact" type="tel" :placeholder="t.contactPlaceholder"
              maxlength="10"
              @input="donateForm.contact = donateForm.contact.replace(/\D/g, '').slice(0, 10)"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <p class="mt-1 text-xs text-gray-500">{{ t.contactNote }}</p>
            <p v-if="donateErr.contact" class="mt-1 text-xs text-red-500">{{ donateErr.contact }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">{{ t.fundFor }}</label>
            <select v-model="donateForm.sectionId"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="general">{{ t.generalFund }}</option>
              <option v-for="s in sections" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">{{ t.numberOfShares }}</label>
            <input v-model.number="donateForm.shares" type="number" min="1"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div class="rounded-xl p-4 flex items-center justify-between" style="background:#e8f7ec">
            <span class="text-sm text-gray-600">{{ t.total }}</span>
            <span class="text-base font-bold" style="color:#2B4DAE">{{ lkr(donateForm.shares * SHARE_PRICE) }}</span>
          </div>
          <button @click="handleDonateSubmit" class="rounded-xl px-4 py-3 text-white font-semibold text-base" style="background:#5BBB6F">{{ t.continue }}</button>
        </div>
      </div>
    </section>

    <!-- ② COST BREAKDOWN -->
    <section id="breakdown" class="max-w-6xl mx-auto px-4 pb-10">
      <div class="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b" style="background:#eef1fb">
          <h2 class="text-lg font-bold text-blue-800">{{ t.costBreakdown }}</h2>
          <span class="text-sm rounded-full px-3 py-1 font-semibold" style="background:#e8f7ec;color:#3d9e52">
            1 {{ t.share }} = LKR {{ SHARE_PRICE.toLocaleString() }}
          </span>
        </div>
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-600">
              <tr>
                <th class="text-left font-medium px-6 py-3">{{ t.section }}</th>
                <th class="text-right font-medium px-6 py-3">{{ t.cost }}</th>
                <th class="text-center font-medium px-6 py-3">{{ t.sharesNeeded }}</th>
                <th class="text-center font-medium px-6 py-3">{{ t.collected }}</th>
                <th class="text-center font-medium px-6 py-3">{{ t.remaining }}</th>
                <th class="text-left font-medium px-6 py-3 w-48">{{ t.progress }}</th>
                <th class="text-right font-medium px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in sections" :key="s.id" class="border-t hover:bg-gray-50">
                <td class="px-6 py-4 font-semibold text-gray-900">{{ s.name }}</td>
                <td class="px-6 py-4 text-right">{{ lkr(s.cost) }}</td>
                <td class="px-6 py-4 text-center">{{ sharesNeeded(s.cost) }}</td>
                <td class="px-6 py-4 text-center">{{ s.collectedShares || 0 }}</td>
                <td class="px-6 py-4 text-center">
                  <span :class="sectionRemaining(s) === 0 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'"
                    class="px-2 py-1 rounded-full text-xs font-semibold">{{ sectionRemaining(s) }}</span>
                </td>
                <td class="px-6 py-4">
                  <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)" :style="{ width: sectionPercent(s) + '%' }"></div>
                  </div>
                  <div class="mt-1 text-xs text-gray-500">{{ sectionPercent(s) }}% {{ t.funded }}</div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex gap-2 justify-end">
                    <button @click="openSectionDetail(s)" class="inline-flex items-center rounded-lg border px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">{{ t.details }}</button>
                    <button @click="selectDonateSection(s.id)" class="inline-flex items-center rounded-lg px-3 py-2 text-white text-xs font-semibold" style="background:#5BBB6F">{{ t.fundThis }}</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="md:hidden grid grid-cols-1 gap-3 p-4">
          <div v-for="s in sections" :key="s.id" class="rounded-2xl border bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="font-bold text-gray-900">{{ s.name }}</div>
                <div class="text-sm font-semibold mt-0.5" style="color:#2B4DAE">{{ lkr(s.cost) }}</div>
              </div>
              <span :class="sectionRemaining(s) === 0 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'"
                class="px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2">{{ sectionRemaining(s) }} {{ t.left }}</span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-1">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)" :style="{ width: sectionPercent(s) + '%' }"></div>
            </div>
            <div class="text-xs text-gray-500 mb-3">{{ sectionPercent(s) }}% {{ t.funded }}</div>
            <div class="flex gap-2 text-xs mb-4">
              <span class="rounded-lg bg-blue-50 text-blue-700 px-2 py-1 font-semibold">{{ t.need }}: {{ sharesNeeded(s.cost) }}</span>
              <span class="rounded-lg bg-green-50 text-green-700 px-2 py-1 font-semibold">{{ t.got }}: {{ s.collectedShares || 0 }}</span>
            </div>
            <div class="flex gap-2">
              <button @click="openSectionDetail(s)" class="flex-1 rounded-xl border py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">{{ t.viewDetails }}</button>
              <button @click="selectDonateSection(s.id)" class="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white" style="background:#5BBB6F">{{ t.fundThis }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ③ DONORS -->
    <section id="donors" class="max-w-6xl mx-auto px-4 pb-12">
      <div class="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b" style="background:#eef1fb">
          <h2 class="text-lg font-bold text-blue-800">{{ t.donors }}</h2>
          <span class="text-sm text-gray-500">{{ t.donorsSubtitle }}</span>
        </div>
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-600">
              <tr>
                <th class="text-left font-medium px-6 py-3">{{ t.donorName }}</th>
                <th class="text-center font-medium px-6 py-3">{{ t.totalCommitment }}</th>
                <th class="text-center font-medium px-6 py-3">{{ t.alreadyGivenShares }}</th>
                <th class="text-right font-medium px-6 py-3">{{ t.alreadyGivenLkr }}</th>
                <th class="text-right font-medium px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in donors" :key="d.id" class="border-t hover:bg-gray-50">
                <td class="px-6 py-4 font-medium" style="color:#2B4DAE">{{ d.name }}</td>
                <td class="px-6 py-4 text-center">{{ d.commitmentShares }}</td>
                <td class="px-6 py-4 text-center">
                  <span class="rounded-full px-2 py-1 text-xs font-semibold" style="background:#e8f7ec;color:#3d9e52">{{ donorPaidShares(d) }}</span>
                </td>
                <td class="px-6 py-4 text-right font-semibold">{{ lkr(donorPaidShares(d) * SHARE_PRICE) }}</td>
                <td class="px-6 py-4 text-right">
                  <button @click="openDonorDetail(d)" class="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100">{{ t.viewBreakdownBtn }} ▾</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="md:hidden grid grid-cols-1 gap-3 p-4">
          <div v-for="d in donors" :key="d.id" class="rounded-2xl border bg-white p-4 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0" style="background:linear-gradient(135deg,#2B4DAE,#5BBB6F)">
                {{ d.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() }}
              </div>
              <div>
                <div class="font-bold text-gray-900 text-sm leading-tight">{{ d.name }}</div>
                <div class="text-xs text-gray-500 mt-0.5">{{ t.committed }}: {{ d.commitmentShares }} {{ t.sharesLower }}</div>
              </div>
            </div>
            <div class="flex gap-2 mb-3">
              <div class="flex-1 rounded-xl p-3 text-center" style="background:#eef1fb">
                <div class="text-xs text-gray-500">{{ t.given }}</div>
                <div class="font-bold text-sm mt-0.5" style="color:#3d9e52">{{ donorPaidShares(d) }} {{ t.sharesLower }}</div>
              </div>
              <div class="flex-1 rounded-xl p-3 text-center" style="background:#eef1fb">
                <div class="text-xs text-gray-500">{{ t.amount }}</div>
                <div class="font-bold text-sm mt-0.5" style="color:#2B4DAE">{{ lkr(donorPaidShares(d) * SHARE_PRICE) }}</div>
              </div>
            </div>
            <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: Math.min((donorPaidShares(d) / (d.commitmentShares || 1)) * 100, 100) + '%' }"></div>
            </div>
            <button @click="openDonorDetail(d)" class="w-full rounded-xl border py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">{{ t.viewPaymentBreakdown }} ▾</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer style="background:#2B4DAE">
      <div class="max-w-6xl mx-auto px-4 py-8 text-sm grid sm:grid-cols-2 gap-4 items-center">
        <div>
          <div class="font-bold text-white cursor-pointer hover:text-green-300 transition-colors" @click="syncFromGoogleSheet">
            {{ t.footerTitle }}
          </div>
          <div class="mt-1 text-blue-200">{{ t.footerDesc }}</div>
        </div>
        <div class="sm:text-right text-white">
          <div><b>{{ t.secretary }}:</b> <span class="text-green-300">{{ projectStore.projectInit.secretaryContact || '07XXXXXXXX' }}</span></div>
          <div><b>{{ t.treasurer }}:</b> <span class="text-green-300">{{ projectStore.projectInit.treasurerContact || '07XXXXXXXX' }}</span></div>
          <div class="mt-1"><b>{{ t.bank }}:</b> {{ projectStore.projectInit.bankDetails || t.bankPlaceholder }}</div>
        </div>
      </div>
    </footer>

    <!-- DONATION CONFIRMATION MODAL -->
    <transition name="modal-fade">
      <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        style="background:rgba(0,0,0,0.45)" @click.self="showConfirmModal = false">
        <div class="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div class="px-6 py-5 text-white" style="background:linear-gradient(135deg,#2B4DAE 0%,#3d9e52 100%)">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <svg class="w-7 h-7 text-green-500" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div class="text-xl font-bold leading-tight">{{ t.requestSubmitted }}</div>
                <div class="text-sm text-white/80 leading-tight mt-1">{{ t.receivedDetails }}</div>
              </div>
            </div>
          </div>
          <div class="px-6 py-5 space-y-5">
            <div class="rounded-2xl p-4 text-sm" style="background:#e8f7ec">
              <div class="font-bold text-blue-800 mb-3">{{ t.donationSummary }}</div>
              <div class="grid grid-cols-2 gap-y-2 text-gray-700">
                <span class="text-gray-500">{{ t.name }}</span><span class="font-semibold text-right">{{ confirmData.name }}</span>
                <span class="text-gray-500">{{ t.contactNumber }}</span><span class="font-semibold text-right">{{ confirmData.contact }}</span>
                <span class="text-gray-500">{{ t.section }}</span><span class="font-semibold text-right">{{ confirmData.sectionLabel }}</span>
                <span class="text-gray-500">{{ t.sharesLabel }}</span><span class="font-semibold text-right">{{ confirmData.shares }} {{ t.shareUnit }}{{ confirmData.shares > 1 ? t.plural : '' }}</span>
                <span class="text-gray-500">{{ t.total }}</span><span class="font-bold text-right" style="color:#2B4DAE">{{ lkr(confirmData.shares * SHARE_PRICE) }}</span>
              </div>
            </div>
            <div>
              <div class="font-bold text-gray-800 mb-3">{{ t.whatNext }}</div>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style="background:#2B4DAE">1</div>
                  <div class="text-sm text-gray-700">{{ t.step1 }}</div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style="background:#2B4DAE">2</div>
                  <div class="text-sm text-gray-700">{{ t.step2 }} <span class="font-semibold" style="color:#3d9e52">{{ confirmData.contact }}</span> {{ t.step2b }}</div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style="background:#2B4DAE">3</div>
                  <div class="text-sm text-gray-700">{{ t.step3 }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6">
            <button @click="closeConfirmModal" class="w-full rounded-2xl py-4 text-white font-bold text-base" style="background:#5BBB6F">{{ t.gotIt }} 🙏</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- SECTION DETAIL POPUP -->
    <transition name="modal-fade">
      <div v-if="sectionDetail" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        style="background:rgba(0,0,0,0.45)" @click.self="sectionDetail = null">
        <div class="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <div class="px-6 py-5 text-white flex items-center justify-between" style="background:linear-gradient(135deg,#2B4DAE 0%,#1e7e3e 100%)">
            <div>
              <div class="text-xl font-bold">{{ sectionDetail.name }}</div>
              <div class="text-sm text-white/80 mt-0.5">{{ t.sectionDetails }}</div>
            </div>
            <button @click="sectionDetail = null" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold text-lg leading-none">✕</button>
          </div>
          <div class="px-6 pt-5 grid grid-cols-2 gap-3">
            <div class="rounded-2xl p-4 text-center" style="background:#eef1fb">
              <div class="text-xs text-gray-500">{{ t.estimatedCost }}</div>
              <div class="font-bold text-blue-800 text-lg mt-1">{{ lkr(sectionDetail.cost) }}</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#eef1fb">
              <div class="text-xs text-gray-500">{{ t.sharesNeeded }}</div>
              <div class="font-bold text-blue-800 text-lg mt-1">{{ sharesNeeded(sectionDetail.cost) }}</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#e8f7ec">
              <div class="text-xs text-gray-500">{{ t.collected }}</div>
              <div class="font-bold text-green-600 text-lg mt-1">{{ sectionDetail.collectedShares || 0 }}</div>
            </div>
            <div class="rounded-2xl p-4 text-center" :style="sectionRemaining(sectionDetail) === 0 ? 'background:#e8f7ec' : 'background:#fef3c7'">
              <div class="text-xs text-gray-500">{{ t.remaining }}</div>
              <div class="font-bold text-lg mt-1" :class="sectionRemaining(sectionDetail) === 0 ? 'text-green-600' : 'text-amber-600'">{{ sectionRemaining(sectionDetail) }}</div>
            </div>
          </div>
          <div class="px-6 py-4">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600 font-medium">{{ t.fundingProgress }}</span>
              <span class="font-bold" style="color:#2B4DAE">{{ sectionPercent(sectionDetail) }}%</span>
            </div>
            <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)" :style="{ width: sectionPercent(sectionDetail) + '%' }"></div>
            </div>
          </div>
          <div class="px-6 pb-2">
            <div class="rounded-2xl p-4 flex items-center justify-between" style="background:#e8f7ec">
              <span class="text-sm text-gray-600">{{ t.amountCollected }}</span>
              <span class="font-bold" style="color:#2B4DAE">{{ lkr((sectionDetail.collectedShares || 0) * SHARE_PRICE) }}</span>
            </div>
          </div>
          <div class="px-6 pb-6 pt-3">
            <button @click="selectDonateSection(sectionDetail.id); sectionDetail = null" class="w-full rounded-2xl py-4 text-white font-bold text-base" style="background:#5BBB6F">{{ t.fundThisSection }} 💚</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- DONOR DETAIL POPUP -->
    <transition name="modal-fade">
      <div v-if="donorDetail" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        style="background:rgba(0,0,0,0.45)" @click.self="donorDetail = null">
        <div class="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-screen overflow-y-auto">
          <div class="px-6 py-5 text-white flex items-center justify-between" style="background:linear-gradient(135deg,#2B4DAE 0%,#1e7e3e 100%)">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center font-bold text-white flex-shrink-0">
                {{ donorDetail.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <div class="text-lg font-bold leading-tight truncate">{{ donorDetail.name }}</div>
                <div class="text-sm text-white/80 mt-0.5">{{ t.committed }}: {{ donorDetail.commitmentShares }} {{ t.sharesLower }}</div>
              </div>
            </div>
            <button @click="donorDetail = null" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold text-lg leading-none flex-shrink-0 ml-2">✕</button>
          </div>
          <div class="px-6 pt-5 grid grid-cols-2 gap-3">
            <div class="rounded-2xl p-4 text-center" style="background:#e8f7ec">
              <div class="text-xs text-gray-500">{{ t.alreadyGiven }}</div>
              <div class="font-bold text-green-600 text-xl mt-1">{{ donorPaidShares(donorDetail) }}</div>
              <div class="text-xs text-gray-500">{{ t.sharesLower }}</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#eef1fb">
              <div class="text-xs text-gray-500">{{ t.totalAmount }}</div>
              <div class="font-bold text-lg mt-1" style="color:#2B4DAE">{{ lkr(donorPaidShares(donorDetail) * SHARE_PRICE) }}</div>
            </div>
          </div>
          <div class="px-6 pt-4 pb-2">
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>{{ t.progressToCommitment }}</span>
              <span class="font-bold" style="color:#2B4DAE">{{ Math.min(Math.round((donorPaidShares(donorDetail) / (donorDetail.commitmentShares || 1)) * 100), 100) }}%</span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: Math.min((donorPaidShares(donorDetail) / (donorDetail.commitmentShares || 1)) * 100, 100) + '%' }"></div>
            </div>
          </div>
          <div class="px-6 py-4">
            <div class="font-bold text-gray-800 mb-3 text-sm">{{ t.paymentBreakdown }}</div>
            <div v-if="donorDetail.payments && donorDetail.payments.length" class="space-y-2">
              <div v-for="(p, pi) in [...donorDetail.payments].sort((a,b) => a.date.localeCompare(b.date))" :key="pi"
                class="rounded-xl border p-3 flex items-center justify-between gap-3">
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-sm text-gray-900 truncate">{{ sectionName(p.sectionId) }}</div>
                  <div class="text-xs text-gray-500 mt-0.5">{{ p.date }}
                    <span class="ml-1 inline-block rounded-md px-1.5 py-0.5 font-semibold" style="background:#eef1fb;color:#2B4DAE">{{ p.note || '-' }}</span>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="font-bold text-sm" style="color:#2B4DAE">{{ p.shares }} {{ t.sharesLower }}</div>
                  <div class="text-xs font-semibold text-green-600">{{ lkr(p.shares * SHARE_PRICE) }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-gray-500 py-2">{{ t.noPayments }}</div>
          </div>
          <div class="px-6 pb-6">
            <button @click="donorDetail = null" class="w-full rounded-2xl py-3 border text-sm font-semibold text-gray-700 hover:bg-gray-50">{{ t.close }}</button>
          </div>
        </div>
      </div>
    </transition>

  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '~/stores/modules/userStore'
import { useProjectStore } from '~/stores/modules/welfare/projects/projectStore'
import { getAccessToken } from '~/composables/getAccessToken'

// ── Page meta ─────────────────────────────────────────────────
definePageMeta({ layout: 'bst' })

// ── Stores ────────────────────────────────────────────────────
const userStore    = useUserStore()
const projectStore = useProjectStore()
const { $showLoading } = useNuxtApp()

// ── Language selector ─────────────────────────────────────────
const { locale } = useI18n()

const languages = [
  { code: 'si', label: 'සිංහල', native: 'SI', langCode: 100 },
  { code: 'en', label: 'English',  native: 'EN', langCode: 200 },
]

// ── currentLang: single source of truth (default = Sinhala) ───
const currentLang = ref(languages[0])   // always starts as සිංහල

useHead({
  title: computed(() => projectStore.projectInit.welfareName || (currentLang.value.code === 'en' ? 'United Welfare Society' : 'එක්සත් සුභසාධක සංගමය')),
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/walfare/Logo.jpg.ico' }]
})

const currentLangLabel = computed(() => currentLang.value.label)

const isLangOpen      = ref(false)
const langDropdownRef = ref(null)

// ── All UI text strings, switching with currentLang ───────────
const translations = {
  si: {
    donate: 'දායාද කරන්න', share: 'බෙදාගන්න',
    heroDesc1: 'ගොඩනැගිල්ල සම්පූර්ණ කිරීමට කොටස් සහාය කරන්න. එක් කොටසක් වටිනාකම',
    heroDesc2: 'ඔබට විශේෂිත කොටසකට (පදනම, බිත්ති, විදුලිය ආදිය) හෝ සාමාන්‍ය අරමුදලට දායාද කළ හැකිය.',
    donateNow: 'දැන් දායාද කරන්න', viewBreakdown: 'පිරිවැය බෙදාහැරීම බලන්න',
    oneShare: '1 කොටස', contact: 'සම්බන්ධ කරන්න', secTreas: 'ලේකම් / භාණ්ඩාගාරික',
    transparency: 'විනිවිදභාවය', plansUpdates: 'සැලසුම් + යාවත්කාලීන',
    quickStats: 'ඉක්මන් සංඛ්‍යාලේඛන',
    totalCostLabel: 'මුළු ඇස්තමේන්තු පිරිවැය', totalShares: 'මුළු කොටස්',
    collectedShares: 'එකතු කළ කොටස්', remainingShares: 'ඉතිරි කොටස්',
    funded: '% අරමුදල් සහිතයි', bankDetails: 'බැංකු විස්තර',
    bankPlaceholder: 'බැංකු නම / ගිණුම: XXXXXXXXX',
    bankNote: 'මාරු කිරීමෙන් පසු, තහවුරු කිරීම සඳහා භාණ්ඩාගාරිකයාට රිසිට්පත යවන්න.',
    buildingPlan: 'ගොඩනැගිලි සැලැස්ම සහ ලේඛන',
    buildingPlanDesc: 'ඔබේ සැලසුම් රූප මෙහි එකතු කරන්න. දායකයින් සඳහා විනිවිදභාවයෙන් තබා ගන්න.',
    downloads: 'බාගැනීම්', buildingPlanPdf: 'ගොඩනැගිලි සැලැස්ම (PDF)',
    costEstimatePdf: 'පිරිවැය ඇස්තමේන්තුව (PDF)', monthlyUpdates: 'මාසික යාවත්කාලීන (PDF)',
    secretary: 'ලේකම්', treasurer: 'භාණ්ඩාගාරික', location: 'ස්ථානය',
    locationPlaceholder: '(ඔබේ ලිපිනය මෙහි)',
    donateByShares: 'කොටස් මගින් දායාද කරන්න',
    donateDesc: 'කොටසක් තෝරන්න (අවශ්‍ය නම්). එක් කොටසක් වටිනාකම',
    fullName: 'සම්පූර්ණ නම', fullNamePlaceholder: 'උදා: අමල් සෙනෙවිරත්න',
    contactNumber: 'දුරකථන අංකය', contactPlaceholder: 'උදා: 077 123 4567',
    contactNote: 'ඔබේ දායාදය පිළිබඳ යාවත්කාලීන සමඟ අපි ඔබව සම්බන්ධ කරගනිමු.',
    fundFor: 'සඳහා අරමුදල්', generalFund: 'සාමාන්‍ය අරමුදල',
    numberOfShares: 'කොටස් ගණන', total: 'මුළු', continue: 'ඉදිරියට යන්න',
    costBreakdown: 'පිරිවැය බෙදාහැරීම (කොටස් අනුව)',
    share: 'කොටස', section: 'කොටස', cost: 'පිරිවැය',
    sharesNeeded: 'අවශ්‍ය කොටස්', collected: 'එකතු කළ', remaining: 'ඉතිරි',
    progress: 'ප්‍රගතිය', funded: 'ව්‍යාප්ත', left: 'ඉතිරියි',
    need: 'අවශ්‍ය', got: 'ලැබුණු', details: 'විස්තර', fundThis: 'මෙය ව්‍යාප්ත කරන්න',
    viewDetails: 'විස්තර බලන්න',
    donors: 'දායකයින්', donorsSubtitle: 'කැපවීම + ගෙවීම් ලබා දී ඇත',
    donorName: 'දායකයාගේ නම', totalCommitment: 'මුළු කැපවීම (කොටස්)',
    alreadyGivenShares: 'දැනටමත් ලබා දී ඇත (කොටස්)',
    alreadyGivenLkr: 'දැනටමත් ලබා දී ඇත (රු.)',
    viewBreakdownBtn: 'බෙදාහැරීම බලන්න',
    committed: 'කැප කළ', sharesLower: 'කොටස්', given: 'ලබා දී ඇත', amount: 'මුදල',
    viewPaymentBreakdown: 'ගෙවීම් බෙදාහැරීම බලන්න',
    footerTitle: 'සුභසාධක සමිති ගොඩනැගිලි අරමුදල',
    footerDesc: 'විනිවිදභාවය: සැලසුම් PDF, ඇස්තමේන්තු සහ මාසික යාවත්කාලීන ප්‍රකාශිත කරන්න.',
    bank: 'බැංකු',
    requestSubmitted: 'ඉල්ලීම ඉදිරිපත් කරන ලදී!',
    receivedDetails: 'අපි ඔබේ විස්තර ලැබුවා',
    donationSummary: 'ඔබේ දායාද සාරාංශය',
    name: 'නම', sharesLabel: 'කොටස්', shareUnit: 'කොටස', plural: '',
    whatNext: 'මීළඟට කුමක් සිදු වේද?',
    step1: 'ඔබේ ඉල්ලීම සමාලෝචනය කරනු ඇත — අපේ භාණ්ඩාගාරික/ලේකම් ඔබේ දායාද විස්තර ලබා ගනු ඇත.',
    step2: 'අපි ඔබව ඇමතීමු —',
    step2b: 'හි පරිපාලකයෙකු ඔබව සම්බන්ධ කරගනු ඇත.',
    step3: 'බැංකු මාරු කිරීම — තහවුරු කිරීමෙන් පසු, ඔබට ගිණුමට මුදල් මාරු කළ හැකිය.',
    gotIt: 'හරි, ස්තූතියි',
    sectionDetails: 'කොටස් විස්තර', estimatedCost: 'ඇස්තමේන්තු පිරිවැය',
    fundingProgress: 'ව්‍යාප්ත ප්‍රගතිය', amountCollected: 'දක්වා එකතු කළ මුදල',
    fundThisSection: 'මෙම කොටස ව්‍යාප්ත කරන්න',
    alreadyGiven: 'දැනටමත් ලබා දී ඇත', totalAmount: 'මුළු මුදල',
    progressToCommitment: 'කැපවීම් දෙසට ප්‍රගතිය',
    paymentBreakdown: 'ගෙවීම් බෙදාහැරීම', noPayments: 'ගෙවීම් තවමත් වාර්තා නොකළ.',
    close: 'වසන්න',
    regLabel: 'ලියාපදිංචි අංකය',
    slideFloor: 'තට්ටු සැලැස්ම', slideElevation: 'ඉදිරිපස දර්ශනය', slideSection: 'කොටස් සැලැස්ම',
  },
  en: {
    donate: 'Donate', share: 'Share',
    heroDesc1: 'Sponsor shares to help complete the building. One share is',
    heroDesc2: 'You can fund a specific section (Foundation, Walls, Wiring, etc.) or donate to the General Fund.',
    donateNow: 'Donate Now', viewBreakdown: 'View Cost Breakdown',
    oneShare: '1 Share', contact: 'Contact', secTreas: 'Secretary / Treasurer',
    transparency: 'Transparency', plansUpdates: 'Plans + Updates',
    quickStats: 'Quick Stats',
    totalCostLabel: 'Total Estimated Cost', totalShares: 'Total Shares',
    collectedShares: 'Collected Shares', remainingShares: 'Remaining Shares',
    funded: 'funded', bankDetails: 'Bank Details',
    bankPlaceholder: 'BANK NAME / Account: XXXXXXXXX',
    bankNote: 'After transfer, send receipt to the Treasurer for confirmation.',
    buildingPlan: 'Building Plan & Documents',
    buildingPlanDesc: 'Add your plan images here or embed a PDF. Keep it transparent for donors.',
    downloads: 'Downloads', buildingPlanPdf: 'Building Plan (PDF)',
    costEstimatePdf: 'Cost Estimate (PDF)', monthlyUpdates: 'Monthly Updates (PDF)',
    secretary: 'Secretary', treasurer: 'Treasurer', location: 'Location',
    locationPlaceholder: '(Your address here)',
    donateByShares: 'Donate by Shares',
    donateDesc: 'Choose a section (optional). One share is',
    fullName: 'Full name', fullNamePlaceholder: 'e.g., Amal Senevirathne',
    contactNumber: 'Contact Number', contactPlaceholder: 'e.g., 077 123 4567',
    contactNote: 'We will contact you with updates on your donations.',
    fundFor: 'Fund for', generalFund: 'General Fund',
    numberOfShares: 'Number of shares', total: 'Total', continue: 'Continue',
    costBreakdown: 'Cost Breakdown (Section-wise)',
    share: 'Share', section: 'Section', cost: 'Cost',
    sharesNeeded: 'Shares Needed', collected: 'Collected', remaining: 'Remaining',
    progress: 'Progress', funded: 'funded', left: 'left',
    need: 'Need', got: 'Got', details: 'Details', fundThis: 'Fund this',
    viewDetails: 'View Details',
    donors: 'Donors', donorsSubtitle: 'Commitment + payments given',
    donorName: 'Donor Name', totalCommitment: 'Total Commitment (Shares)',
    alreadyGivenShares: 'Already Given (Shares)', alreadyGivenLkr: 'Already Given (LKR)',
    viewBreakdownBtn: 'View Breakdown',
    committed: 'Committed', sharesLower: 'shares', given: 'Given', amount: 'Amount',
    viewPaymentBreakdown: 'View Payment Breakdown',
    footerTitle: 'Welfare Society Building Fund',
    footerDesc: 'For transparency: publish plan PDFs, estimates, and monthly updates.',
    bank: 'Bank',
    requestSubmitted: 'Request Submitted!', receivedDetails: "We've received your details",
    donationSummary: 'Your Donation Summary',
    name: 'Name', sharesLabel: 'Shares', shareUnit: 'share', plural: 's',
    whatNext: 'What happens next?',
    step1: 'Admin reviews your request — Our treasurer/secretary will receive your donation details shortly.',
    step2: 'We will call you — An admin will contact you on',
    step2b: 'to confirm.',
    step3: 'Bank Transfer — After confirmation, you can transfer the amount to our bank account.',
    gotIt: 'Got it, Thank you',
    sectionDetails: 'Section Details', estimatedCost: 'Estimated Cost',
    fundingProgress: 'Funding Progress', amountCollected: 'Amount Collected so far',
    fundThisSection: 'Fund This Section',
    alreadyGiven: 'Already Given', totalAmount: 'Total Amount',
    progressToCommitment: 'Progress toward commitment',
    paymentBreakdown: 'Payment Breakdown', noPayments: 'No payments recorded yet.',
    close: 'Close',
    regLabel: 'Reg',
    slideFloor: 'Floor Plan', slideElevation: 'Elevation Plan', slideSection: 'Section Plan',
  }
}

// t = reactive translations object based on currentLang
const t = computed(() => translations[currentLang.value.code] ?? translations.si)

// ── Language switch ────────────────────────────────────────────
async function selectLang(lang) {
  currentLang.value  = lang
  locale.value       = lang.code
  isLangOpen.value   = false
  await projectStore.GetProjectInit($showLoading, lang.langCode)

  // Re-apply currentDevelopment match after language switch
  const sectionId = projectStore.projectInit?.currentDevelopmentSectionId
  donateForm.value.sectionId = sectionId || 'general'
}

function onOutsideClick(e) {
  if (langDropdownRef.value && !langDropdownRef.value.contains(e.target)) {
    isLangOpen.value = false
  }
}

// ── Page state ────────────────────────────────────────────────
const planIndex        = ref(0)
const showConfirmModal = ref(false)
const sectionDetail    = ref(null)
const donorDetail      = ref(null)

const planSlides = computed(() => [
  { label: t.value.slideFloor,     src: '/walfare/floor.jpeg' },
  { label: t.value.slideElevation, src: '/walfare/frontElevation.jpeg' },
  { label: t.value.slideSection,   src: '/walfare/section.jpeg' },
])

const donateForm  = ref({ name: '', contact: '', sectionId: 'general', shares: 1 })
const donateErr   = ref({ name: '', contact: '' })
const confirmData = ref({ name: '', contact: '', sectionId: 'general', sectionLabel: 'සාමාන්‍ය අරමුදල', shares: 1 })

// ── Computed ──────────────────────────────────────────────────
const SHARE_PRICE     = computed(() => projectStore.projectInit?.sharePrice || 5000)
const sections        = computed(() => projectStore.projectInit?.sections || [])
const donors          = computed(() => projectStore.projectInit?.donors || [])
const totalCost       = computed(() => sections.value.reduce((a, s) => a + (s.cost || 0), 0))
const totalShares     = computed(() => Math.ceil(totalCost.value / SHARE_PRICE.value))
const collectedShares = computed(() => sections.value.reduce((a, s) => a + (s.collectedShares || 0), 0))
const remainingShares = computed(() => Math.max(totalShares.value - collectedShares.value, 0))
const overallPercent  = computed(() => totalShares.value ? (collectedShares.value / totalShares.value) * 100 : 0)

// ── Methods ───────────────────────────────────────────────────
const lkr = (n) => 'LKR ' + Number(n).toLocaleString('en-US')
const sharesNeeded     = (cost) => Math.ceil(cost / SHARE_PRICE.value)
const sectionRemaining = (s) => Math.max(sharesNeeded(s.cost) - (s.collectedShares || 0), 0)
const sectionPercent   = (s) => {
  const need = sharesNeeded(s.cost)
  return need ? Math.min(((s.collectedShares || 0) / need) * 100, 100).toFixed(0) : 0
}
const sectionName = (id) => {
  if (!id || id === 'general') return t.value.generalFund
  return sections.value.find(x => x.id === id)?.name || t.value.generalFund
}
const donorPaidShares = (d) => (d.payments || []).reduce((a, p) => a + (p.shares || 0), 0)

const planPrev = () => { planIndex.value = (planIndex.value - 1 + planSlides.value.length) % planSlides.value.length }
const planNext = () => { planIndex.value = (planIndex.value + 1) % planSlides.value.length }

const openSectionDetail = (s) => { sectionDetail.value = s }
const openDonorDetail   = (d) => { donorDetail.value = d }

const selectDonateSection = (sectionId) => {
  donateForm.value.sectionId = sectionId
  nextTick(() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' }))
}

const IsValidate = () => {
  donateErr.value = { name: '', contact: '' }
  let valid = true
  if (!donateForm.value.name.trim())    { donateErr.value.name    = currentLang.value.code === 'si' ? 'සම්පූර්ණ නම අවශ්‍යයි.' : 'Full name is required.'; valid = false }
  if (!donateForm.value.contact.trim()) { donateErr.value.contact = currentLang.value.code === 'si' ? 'දුරකථන අංකය අවශ්‍යයි.' : 'Contact number is required.'; valid = false }
  else if (donateForm.value.contact.length !== 10) { donateErr.value.contact = currentLang.value.code === 'si' ? 'දුරකථන අංකය ඉලක්කම් 10ක් විය යුතුය.' : 'Contact number must be 10 digits.'; valid = false }
  return valid
}

const handleDonateSubmit = () => {
  if (!IsValidate()) return
  confirmData.value = {
    name:         donateForm.value.name,
    contact:      donateForm.value.contact,
    sectionId:    donateForm.value.sectionId,
    sectionLabel: sectionName(donateForm.value.sectionId),
    shares:       donateForm.value.shares,
  }
  showConfirmModal.value = true
}

const closeConfirmModal = async () => {
  showConfirmModal.value = false

  // ── Send admin email notification (this IS the submission) ──
  const success = await projectStore.SendDonorNotificationEmail(
    confirmData.value.name,
    confirmData.value.contact,
    confirmData.value.shares,
    confirmData.value.sectionId === 'general' ? 'general' : confirmData.value.sectionLabel
  )

  if (success) {
    donateForm.value = { name: '', contact: '', sectionId: 'general', shares: 1 }
    await projectStore.GetProjectInit($showLoading, currentLang.value.langCode)
  }
}

const syncFromGoogleSheet = async () => {
  const success = await projectStore.syncFromGoogleSheet($showLoading)
  if (success) await projectStore.GetProjectInit($showLoading, currentLang.value.langCode)
}

const handleShare = async () => {
  const url  = window.location.href
  const text = currentLang.value.code === 'si'
    ? 'අපේ සුභසාධක සමිතියේ ගොඩනැගිලි අරමුදලට සහාය වන්න. එක් කොටසක් LKR 5,000.'
    : 'Support our Welfare Society Building Fund. One share is LKR 5,000.'
  if (navigator.share) {
    try { await navigator.share({ title: document.title, text, url }) } catch { }
  } else {
    await navigator.clipboard.writeText(url)
    useNuxtApp().$showAlert('Link copied!', 'success')
  }
}

// ── Init ──────────────────────────────────────────────────────
onMounted(async () => {
  document.addEventListener('click', onOutsideClick)

  // ── Force Sinhala as default ──
  currentLang.value = languages[0]   // සිංහල
  locale.value      = 'si'

  if (!userStore.token) {
    const token = await getAccessToken()
    if (token) userStore.token = token
  }

  // Load with langCode 100 (Sinhala)
  await projectStore.GetProjectInit($showLoading, 100)

  // Auto-select currentDevelopment on initial load
  const sectionId = projectStore.projectInit?.currentDevelopmentSectionId
  if (sectionId) donateForm.value.sectionId = sectionId
})

// Auto-select currentDevelopment section once sections are loaded
watch(sections, (newSections) => {
  if (!newSections.length) return
  const sectionId = projectStore.projectInit?.currentDevelopmentSectionId
  if (sectionId) donateForm.value.sectionId = sectionId
}, { immediate: true })

onBeforeUnmount(() => {
  document.removeEventListener('click', onOutsideClick)
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
.overflow-x-auto::-webkit-scrollbar { display: none; }
.overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
</style>