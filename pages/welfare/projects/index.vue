<template>
  <section class="bg-gray-50 text-gray-900 min-h-screen">

    <!-- Header -->
    <header class="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img :src="'/walfare/Logo.jpeg'" alt="Welfare Society Logo" class="h-12 w-auto" />
          <div>
            <div class="font-bold text-blue-800 leading-tight text-base">{{ projectStore.projectInit.welfareName }}</div>
            <div class="text-xs text-green-600 leading-tight font-medium">Reg: {{ projectStore.projectInit.registrationNo }}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <a href="#donate" class="hidden sm:inline-flex rounded-xl px-5 py-2 text-white text-sm font-semibold" style="background:#5BBB6F">Donate</a>
          <button @click="handleShare" class="inline-flex rounded-xl border px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Share</button>
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
              <div class="text-lg font-semibold text-green-600">Reg: {{ projectStore.projectInit.registrationNo }}</div>
            </div>
          </div>
          <p class="mt-2 text-gray-600">
            Sponsor shares to help complete the building. One share is <b>LKR {{ SHARE_PRICE.toLocaleString() }}</b>.
            You can fund a specific section (Foundation, Walls, Wiring, etc.) or donate to the General Fund.
          </p>
          <div class="mt-6 flex gap-2">
                     <a href="#donate" class="rounded-xl px-4 py-2 sm:px-5 sm:py-3 text-white font-semibold text-sm sm:text-base" style="background:#5BBB6F">Donate Now</a>
                       <a href="#breakdown" class="rounded-xl border px-4 py-2 sm:px-5 sm:py-3 font-semibold text-gray-700 text-sm sm:text-base hover:bg-gray-50">View Cost Breakdown</a>
          </div>
          <div class="mt-6 grid sm:grid-cols-3 gap-3">
            <div class="rounded-2xl border bg-white p-4">
              <div class="text-xs text-gray-500">1 Share</div>
              <div class="text-lg font-bold text-blue-800">LKR {{ SHARE_PRICE.toLocaleString() }}</div>
            </div>
            <div class="rounded-2xl border bg-white p-4">
              <div class="text-xs text-gray-500">Contact</div>
              <div class="text-sm font-semibold text-green-600">Secretary / Treasurer</div>
            </div>
            <div class="rounded-2xl border bg-white p-4">
              <div class="text-xs text-gray-500">Transparency</div>
              <div class="text-sm font-semibold text-green-600">Plans + Updates</div>
            </div>
          </div>
        </div>
   

        <!-- Stats card -->
        <div class="rounded-2xl border bg-white shadow-sm p-6">
          <div class="text-sm text-gray-500 font-medium">Quick Stats</div>
          <div class="mt-4 grid grid-cols-2 gap-3">
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">Total Estimated Cost</div>
              <div class="font-bold text-green-600 text-lg">{{ lkr(totalCost) }}</div>
            </div>
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">Total Shares</div>
              <div class="font-bold text-blue-800 text-lg">{{ totalShares }}</div>
            </div>
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">Collected Shares</div>
              <div class="font-bold text-green-600 text-lg">{{ collectedShares }}</div>
            </div>
            <div class="rounded-xl border p-4">
              <div class="text-xs text-gray-500">Remaining Shares</div>
              <div class="font-bold text-blue-800 text-lg">{{ remainingShares }}</div>
            </div>
          </div>
          <div class="mt-5">
            <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: Math.min(overallPercent, 100) + '%' }"></div>
            </div>
            <div class="mt-2 text-xs text-gray-500">{{ overallPercent.toFixed(0) }}% funded</div>
          </div>
          <div class="mt-5 rounded-xl p-4 text-sm text-blue-900" style="background:#eef1fb">
            <div class="font-bold text-blue-800">Bank Details</div>
            <div class="mt-1">{{ projectStore.projectInit.bankDetails || 'BANK NAME / Account: XXXXXXXXX' }}</div>
            <div class="mt-2 text-xs text-gray-500">After transfer, send receipt to the Treasurer for confirmation.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plan + Donate -->
    <section class="max-w-6xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b" style="background:#eef1fb">
          <h2 class="text-lg font-bold text-blue-800">Building Plan &amp; Documents</h2>
          <p class="text-sm text-gray-600">Add your plan images here or embed a PDF. Keep it transparent for donors.</p>
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
              <div class="font-bold text-green-600">Downloads</div>
              <div class="mt-2 space-y-2">
                <a class="block text-blue-700 font-semibold hover:underline" href="#" @click.prevent>Building Plan (PDF)</a>
                <a class="block text-blue-700 font-semibold hover:underline" href="#" @click.prevent>Cost Estimate (PDF)</a>
                <a class="block text-blue-700 font-semibold hover:underline" href="#" @click.prevent>Monthly Updates (PDF)</a>
              </div>
            </div>
            <div class="rounded-xl border p-4 text-sm w-1/2 text-gray-700">
              <div><b>Secretary:</b> {{ projectStore.projectInit.secretaryContact || '07X XXX XXXX' }}</div>
              <div><b>Treasurer:</b> {{ projectStore.projectInit.treasurerContact || '07X XXX XXXX' }}</div>
              <div class="mt-2"><b>Location:</b> {{ projectStore.projectInit.location || '(Your address here)' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div id="donate" class="rounded-2xl border bg-white shadow-sm p-6">
        <h3 class="text-lg font-bold text-blue-800">Donate by Shares</h3>
        <p class="text-sm text-gray-600 mt-1">Choose a section (optional). One share is <b>LKR {{ SHARE_PRICE.toLocaleString() }}</b>.</p>
        <div class="mt-5 grid gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Full name</label>
            <input v-model="donateForm.name" type="text" placeholder="e.g., Amal Senevirathne"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <p v-if="donateErr.name" class="mt-1 text-xs text-red-500">{{ donateErr.name }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contact Number</label>
            <input v-model="donateForm.contact" type="tel" placeholder="e.g., 077 123 4567"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
            <p class="mt-1 text-xs text-gray-500">We will contact you with updates on your donations.</p>
            <p v-if="donateErr.contact" class="mt-1 text-xs text-red-500">{{ donateErr.contact }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Fund for</label>
            <select v-model="donateForm.sectionId"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
              <option value="general">General Fund</option>
              <option v-for="s in sections" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Number of shares</label>
            <input v-model.number="donateForm.shares" type="number" min="1"
              class="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div class="rounded-xl p-4 flex items-center justify-between" style="background:#e8f7ec">
            <span class="text-sm text-gray-600">Total</span>
            <span class="text-base font-bold" style="color:#2B4DAE">{{ lkr(donateForm.shares * SHARE_PRICE) }}</span>
          </div>
          <button @click="handleDonateSubmit" class="rounded-xl px-4 py-3 text-white font-semibold text-base" style="background:#5BBB6F">Continue</button>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         ② COST BREAKDOWN — table on desktop, cards on mobile
    ══════════════════════════════════════════════════════════ -->
    <section id="breakdown" class="max-w-6xl mx-auto px-4 pb-10">
      <div class="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b" style="background:#eef1fb">
          <h2 class="text-lg font-bold text-blue-800">Cost Breakdown (Section-wise)</h2>
          <span class="text-sm rounded-full px-3 py-1 font-semibold" style="background:#e8f7ec;color:#3d9e52">
            1 Share = LKR {{ SHARE_PRICE.toLocaleString() }}
          </span>
        </div>

        <!-- Desktop table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-600">
              <tr>
                <th class="text-left font-medium px-6 py-3">Section</th>
                <th class="text-right font-medium px-6 py-3">Cost</th>
                <th class="text-center font-medium px-6 py-3">Shares Needed</th>
                <th class="text-center font-medium px-6 py-3">Collected</th>
                <th class="text-center font-medium px-6 py-3">Remaining</th>
                <th class="text-left font-medium px-6 py-3 w-48">Progress</th>
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
                    <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                      :style="{ width: sectionPercent(s) + '%' }"></div>
                  </div>
                  <div class="mt-1 text-xs text-gray-500">{{ sectionPercent(s) }}% funded</div>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex gap-2 justify-end">
                    <button @click="openSectionDetail(s)"
                      class="inline-flex items-center rounded-lg border px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                      Details
                    </button>
                    <button @click="selectDonateSection(s.id)"
                      class="inline-flex items-center rounded-lg px-3 py-2 text-white text-xs font-semibold" style="background:#5BBB6F">
                      Fund this
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile section cards -->
        <div class="md:hidden grid grid-cols-1 gap-3 p-4">
          <div v-for="s in sections" :key="s.id" class="rounded-2xl border bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between mb-3">
              <div>
                <div class="font-bold text-gray-900">{{ s.name }}</div>
                <div class="text-sm font-semibold mt-0.5" style="color:#2B4DAE">{{ lkr(s.cost) }}</div>
              </div>
              <span :class="sectionRemaining(s) === 0 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'"
                class="px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2">
                {{ sectionRemaining(s) }} left
              </span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-1">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: sectionPercent(s) + '%' }"></div>
            </div>
            <div class="text-xs text-gray-500 mb-3">{{ sectionPercent(s) }}% funded</div>
            <div class="flex gap-2 text-xs mb-4">
              <span class="rounded-lg bg-blue-50 text-blue-700 px-2 py-1 font-semibold">Need: {{ sharesNeeded(s.cost) }}</span>
              <span class="rounded-lg bg-green-50 text-green-700 px-2 py-1 font-semibold">Got: {{ s.collectedShares || 0 }}</span>
            </div>
            <div class="flex gap-2">
              <button @click="openSectionDetail(s)"
                class="flex-1 rounded-xl border py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                View Details
              </button>
              <button @click="selectDonateSection(s.id)"
                class="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white" style="background:#5BBB6F">
                Fund This
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         ③ DONORS — table on desktop, cards on mobile
    ══════════════════════════════════════════════════════════ -->
    <section id="donors" class="max-w-6xl mx-auto px-4 pb-12">
      <div class="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b" style="background:#eef1fb">
          <h2 class="text-lg font-bold text-blue-800">Donors</h2>
          <span class="text-sm text-gray-500">Commitment + payments given</span>
        </div>

        <!-- Desktop table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-gray-50 text-gray-600">
              <tr>
                <th class="text-left font-medium px-6 py-3">Donor Name</th>
                <th class="text-center font-medium px-6 py-3">Total Commitment (Shares)</th>
                <th class="text-center font-medium px-6 py-3">Already Given (Shares)</th>
                <th class="text-right font-medium px-6 py-3">Already Given (LKR)</th>
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
                  <button @click="openDonorDetail(d)"
                    class="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100">
                    View Breakdown ▾
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile donor cards -->
        <div class="md:hidden grid grid-cols-1 gap-3 p-4">
          <div v-for="d in donors" :key="d.id" class="rounded-2xl border bg-white p-4 shadow-sm">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                style="background:linear-gradient(135deg,#2B4DAE,#5BBB6F)">
                {{ d.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() }}
              </div>
              <div>
                <div class="font-bold text-gray-900 text-sm leading-tight">{{ d.name }}</div>
                <div class="text-xs text-gray-500 mt-0.5">Committed: {{ d.commitmentShares }} shares</div>
              </div>
            </div>
            <div class="flex gap-2 mb-3">
              <div class="flex-1 rounded-xl p-3 text-center" style="background:#eef1fb">
                <div class="text-xs text-gray-500">Given</div>
                <div class="font-bold text-sm mt-0.5" style="color:#3d9e52">{{ donorPaidShares(d) }} shares</div>
              </div>
              <div class="flex-1 rounded-xl p-3 text-center" style="background:#eef1fb">
                <div class="text-xs text-gray-500">Amount</div>
                <div class="font-bold text-sm mt-0.5" style="color:#2B4DAE">{{ lkr(donorPaidShares(d) * SHARE_PRICE) }}</div>
              </div>
            </div>
            <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden mb-3">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: Math.min((donorPaidShares(d) / (d.commitmentShares || 1)) * 100, 100) + '%' }"></div>
            </div>
            <button @click="openDonorDetail(d)"
              class="w-full rounded-xl border py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              View Payment Breakdown ▾
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer style="background:#2B4DAE">
      <div class="max-w-6xl mx-auto px-4 py-8 text-sm grid sm:grid-cols-2 gap-4 items-center">
        <div>
          <div class="font-bold text-white">Welfare Society Building Fund</div>
          <div class="mt-1 text-blue-200">For transparency: publish plan PDFs, estimates, and monthly updates.</div>
        </div>
        <div class="sm:text-right text-white">
          <div><b>Secretary:</b> <span class="text-green-300">{{ projectStore.projectInit.secretaryContact || '07XXXXXXXX' }}</span></div>
          <div><b>Treasurer:</b> <span class="text-green-300">{{ projectStore.projectInit.treasurerContact || '07XXXXXXXX' }}</span></div>
          <div class="mt-1"><b>Bank:</b> {{ projectStore.projectInit.bankDetails || 'BANK NAME / Account: XXXXXXXXX' }}</div>
        </div>
      </div>
    </footer>

    <!-- ═══ DONATION CONFIRMATION MODAL ═══ -->
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
                <div class="text-xl font-bold leading-tight">Request Submitted!</div>
                <div class="text-sm text-white/80 leading-tight mt-1">We've received your details</div>
              </div>
            </div>
          </div>
          <div class="px-6 py-5 space-y-5">
            <div class="rounded-2xl p-4 text-sm" style="background:#e8f7ec">
              <div class="font-bold text-blue-800 mb-3">Your Donation Summary</div>
              <div class="grid grid-cols-2 gap-y-2 text-gray-700">
                <span class="text-gray-500">Name</span><span class="font-semibold text-right">{{ confirmData.name }}</span>
                <span class="text-gray-500">Contact</span><span class="font-semibold text-right">{{ confirmData.contact }}</span>
                <span class="text-gray-500">Section</span><span class="font-semibold text-right">{{ confirmData.sectionLabel }}</span>
                <span class="text-gray-500">Shares</span><span class="font-semibold text-right">{{ confirmData.shares }} share{{ confirmData.shares > 1 ? 's' : '' }}</span>
                <span class="text-gray-500">Total</span><span class="font-bold text-right" style="color:#2B4DAE">{{ lkr(confirmData.shares * SHARE_PRICE) }}</span>
              </div>
            </div>
            <div>
              <div class="font-bold text-gray-800 mb-3">What happens next?</div>
              <div class="space-y-3">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style="background:#2B4DAE">1</div>
                  <div class="text-sm text-gray-700"><b>Admin reviews your request</b> — Our treasurer/secretary will receive your donation details shortly.</div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style="background:#2B4DAE">2</div>
                  <div class="text-sm text-gray-700"><b>We will call you</b> — An admin will contact you on <span class="font-semibold" style="color:#3d9e52">{{ confirmData.contact }}</span> to confirm.</div>
                </div>
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style="background:#2B4DAE">3</div>
                  <div class="text-sm text-gray-700"><b>Bank Transfer</b> — After confirmation, you can transfer the amount to our bank account.</div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6">
            <button @click="closeConfirmModal" class="w-full rounded-2xl py-4 text-white font-bold text-base" style="background:#5BBB6F">
              Got it, Thank you! 🙏
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ═══ SECTION DETAIL POPUP ═══ -->
    <transition name="modal-fade">
      <div v-if="sectionDetail" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        style="background:rgba(0,0,0,0.45)" @click.self="sectionDetail = null">
        <div class="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden">
          <!-- Header -->
          <div class="px-6 py-5 text-white flex items-center justify-between" style="background:linear-gradient(135deg,#2B4DAE 0%,#1e7e3e 100%)">
            <div>
              <div class="text-xl font-bold">{{ sectionDetail.name }}</div>
              <div class="text-sm text-white/80 mt-0.5">Section Details</div>
            </div>
            <button @click="sectionDetail = null" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold text-lg leading-none">✕</button>
          </div>
          <!-- Stats grid -->
          <div class="px-6 pt-5 grid grid-cols-2 gap-3">
            <div class="rounded-2xl p-4 text-center" style="background:#eef1fb">
              <div class="text-xs text-gray-500">Estimated Cost</div>
              <div class="font-bold text-blue-800 text-lg mt-1">{{ lkr(sectionDetail.cost) }}</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#eef1fb">
              <div class="text-xs text-gray-500">Shares Needed</div>
              <div class="font-bold text-blue-800 text-lg mt-1">{{ sharesNeeded(sectionDetail.cost) }}</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#e8f7ec">
              <div class="text-xs text-gray-500">Collected</div>
              <div class="font-bold text-green-600 text-lg mt-1">{{ sectionDetail.collectedShares || 0 }}</div>
            </div>
            <div class="rounded-2xl p-4 text-center" :style="sectionRemaining(sectionDetail) === 0 ? 'background:#e8f7ec' : 'background:#fef3c7'">
              <div class="text-xs text-gray-500">Remaining</div>
              <div class="font-bold text-lg mt-1" :class="sectionRemaining(sectionDetail) === 0 ? 'text-green-600' : 'text-amber-600'">
                {{ sectionRemaining(sectionDetail) }}
              </div>
            </div>
          </div>
          <!-- Progress -->
          <div class="px-6 py-4">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-gray-600 font-medium">Funding Progress</span>
              <span class="font-bold" style="color:#2B4DAE">{{ sectionPercent(sectionDetail) }}%</span>
            </div>
            <div class="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: sectionPercent(sectionDetail) + '%' }"></div>
            </div>
          </div>
          <!-- Amount collected -->
          <div class="px-6 pb-2">
            <div class="rounded-2xl p-4 flex items-center justify-between" style="background:#e8f7ec">
              <span class="text-sm text-gray-600">Amount Collected so far</span>
              <span class="font-bold" style="color:#2B4DAE">{{ lkr((sectionDetail.collectedShares || 0) * SHARE_PRICE) }}</span>
            </div>
          </div>
          <!-- CTA -->
          <div class="px-6 pb-6 pt-3">
            <button @click="selectDonateSection(sectionDetail.id); sectionDetail = null"
              class="w-full rounded-2xl py-4 text-white font-bold text-base" style="background:#5BBB6F">
              Fund This Section 💚
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ═══ DONOR DETAIL POPUP ═══ -->
    <transition name="modal-fade">
      <div v-if="donorDetail" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        style="background:rgba(0,0,0,0.45)" @click.self="donorDetail = null">
        <div class="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-screen overflow-y-auto">
          <!-- Header -->
          <div class="px-6 py-5 text-white flex items-center justify-between" style="background:linear-gradient(135deg,#2B4DAE 0%,#1e7e3e 100%)">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center font-bold text-white flex-shrink-0">
                {{ donorDetail.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() }}
              </div>
              <div class="min-w-0">
                <div class="text-lg font-bold leading-tight truncate">{{ donorDetail.name }}</div>
                <div class="text-sm text-white/80 mt-0.5">Committed: {{ donorDetail.commitmentShares }} shares</div>
              </div>
            </div>
            <button @click="donorDetail = null" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold text-lg leading-none flex-shrink-0 ml-2">✕</button>
          </div>
          <!-- Summary -->
          <div class="px-6 pt-5 grid grid-cols-2 gap-3">
            <div class="rounded-2xl p-4 text-center" style="background:#e8f7ec">
              <div class="text-xs text-gray-500">Already Given</div>
              <div class="font-bold text-green-600 text-xl mt-1">{{ donorPaidShares(donorDetail) }}</div>
              <div class="text-xs text-gray-500">shares</div>
            </div>
            <div class="rounded-2xl p-4 text-center" style="background:#eef1fb">
              <div class="text-xs text-gray-500">Total Amount</div>
              <div class="font-bold text-lg mt-1" style="color:#2B4DAE">{{ lkr(donorPaidShares(donorDetail) * SHARE_PRICE) }}</div>
            </div>
          </div>
          <!-- Progress toward commitment -->
          <div class="px-6 pt-4 pb-2">
            <div class="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress toward commitment</span>
              <span class="font-bold" style="color:#2B4DAE">
                {{ Math.min(Math.round((donorPaidShares(donorDetail) / (donorDetail.commitmentShares || 1)) * 100), 100) }}%
              </span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full" style="background:linear-gradient(90deg,#5BBB6F,#2B4DAE)"
                :style="{ width: Math.min((donorPaidShares(donorDetail) / (donorDetail.commitmentShares || 1)) * 100, 100) + '%' }"></div>
            </div>
          </div>
          <!-- Payment breakdown -->
          <div class="px-6 py-4">
            <div class="font-bold text-gray-800 mb-3 text-sm">Payment Breakdown</div>
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
                  <div class="font-bold text-sm" style="color:#2B4DAE">{{ p.shares }} shares</div>
                  <div class="text-xs font-semibold text-green-600">{{ lkr(p.shares * SHARE_PRICE) }}</div>
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-gray-500 py-2">No payments recorded yet.</div>
          </div>
          <div class="px-6 pb-6">
            <button @click="donorDetail = null" class="w-full rounded-2xl py-3 border text-sm font-semibold text-gray-700 hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>
    </transition>

  </section>
</template>

<script setup>
definePageMeta({ layout: 'bst' });
</script>

<script>
import { useUserStore } from '~/stores/modules/userStore';
import { useProjectStore } from '~/stores/modules/welfare/projects/projectStore';
import { getAccessToken } from '~/composables/getAccessToken';

export default {
  data() {
    return {
      showLoading: null,
      planIndex: 0,
      planSlides: [
        { label: 'Floor Plan', src: '/walfare/floor.jpeg' },
        { label: 'Elevation Plan', src: '/walfare/frontElevation.jpeg' },
        { label: 'Section Plan', src: '/walfare/section.jpeg' },
      ],
      donateForm: { name: '', contact: '', sectionId: 'general', shares: 1 },
      donateErr: { name: '', contact: '' },
      showConfirmModal: false,
      confirmData: { name: '', contact: '', sectionId: 'general', sectionLabel: 'General Fund', shares: 1 },
      sectionDetail: null,   // holds section object for popup
      donorDetail: null,     // holds donor object for popup
    };
  },

  async created() {
    this.userStore = useUserStore();
    this.projectStore = useProjectStore();
    this.showLoading = this.$showLoading;
    if (process.client) {
      if (!this.userStore.token) {
        const token = await getAccessToken();
        if (token) this.userStore.token = token;
      }
      await this.projectStore.GetProjectInit(this.showLoading);
    }
  },

  computed: {
    SHARE_PRICE() { return this.projectStore?.projectInit?.sharePrice || 5000; },
    sections()     { return this.projectStore?.projectInit?.sections || []; },
    donors()       { return this.projectStore?.projectInit?.donors || []; },
    totalCost()    { return this.sections.reduce((a, s) => a + (s.cost || 0), 0); },
    totalShares()  { return Math.ceil(this.totalCost / this.SHARE_PRICE); },
    collectedShares() { return this.sections.reduce((a, s) => a + (s.collectedShares || 0), 0); },
    remainingShares() { return Math.max(this.totalShares - this.collectedShares, 0); },
    overallPercent()  { return this.totalShares ? (this.collectedShares / this.totalShares) * 100 : 0; },
  },

  methods: {
    lkr(n) { return 'LKR ' + Number(n).toLocaleString('en-US'); },
    sharesNeeded(cost) { return Math.ceil(cost / this.SHARE_PRICE); },
    sectionRemaining(s) { return Math.max(this.sharesNeeded(s.cost) - (s.collectedShares || 0), 0); },
    sectionPercent(s) {
      const need = this.sharesNeeded(s.cost);
      return need ? Math.min(((s.collectedShares || 0) / need) * 100, 100).toFixed(0) : 0;
    },
    sectionName(id) {
      if (!id || id === 'general') return 'General Fund';
      return this.sections.find(x => x.id === id)?.name || 'General Fund';
    },
    donorPaidShares(d) { return (d.payments || []).reduce((a, p) => a + (p.shares || 0), 0); },
    planPrev() { this.planIndex = (this.planIndex - 1 + this.planSlides.length) % this.planSlides.length; },
    planNext() { this.planIndex = (this.planIndex + 1) % this.planSlides.length; },

    openSectionDetail(s) { this.sectionDetail = s; },
    openDonorDetail(d)   { this.donorDetail = d; },

    selectDonateSection(sectionId) {
      this.donateForm.sectionId = sectionId;
      this.$nextTick(() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' }));
    },

    IsValidate() {
      this.donateErr = { name: '', contact: '' };
      let valid = true;
      if (!this.donateForm.name.trim())    { this.donateErr.name = 'Full name is required.';       valid = false; }
      if (!this.donateForm.contact.trim()) { this.donateErr.contact = 'Contact number is required.'; valid = false; }
      return valid;
    },

    handleDonateSubmit() {
      if (!this.IsValidate()) return;
      this.confirmData = {
        name: this.donateForm.name,
        contact: this.donateForm.contact,
        sectionId: this.donateForm.sectionId,
        sectionLabel: this.sectionName(this.donateForm.sectionId),
        shares: this.donateForm.shares,
      };
      this.showConfirmModal = true;
    },

    async closeConfirmModal() {
      this.showConfirmModal = false;
      const success = await this.projectStore.SubmitDonation({
        name: this.confirmData.name,
        contact: this.confirmData.contact,
        sectionId: this.confirmData.sectionId,
        shares: this.confirmData.shares,
      }, this.showLoading);
      if (success) {
        this.donateForm = { name: '', contact: '', sectionId: 'general', shares: 1 };
        await this.projectStore.GetProjectInit(this.showLoading);
      }
    },

    async handleShare() {
      const url = window.location.href;
      const text = 'Support our Welfare Society Building Fund. One share is LKR 5,000.';
      if (navigator.share) {
        try { await navigator.share({ title: document.title, text, url }); } catch { }
      } else {
        await navigator.clipboard.writeText(url);
        this.$showAlert('Link copied!', 'success');
      }
    },
  },

  head() { return { title: 'Building Fund - Welfare Society' }; },
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

/* Hide scrollbar on horizontal snap row */
.overflow-x-auto::-webkit-scrollbar { display: none; }
.overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }
</style>