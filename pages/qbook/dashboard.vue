<script setup>
definePageMeta({
  layout: 'qbooklogin',
  middleware: 'auth-ebook',
})
</script>

<template>
  <section class="min-h-screen bg-white">
    <div class="px-6 py-6 min-h-screen bg-white">

      <!-- ── Page Title + Controls ─────────────────────────────── -->
      <div class="flex flex-col gap-4">

        <!-- Row 1: Title + Action Buttons -->
        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <div class="text-2xl font-extrabold text-black">📊 Dashboard</div>
            <div class="text-sm" style="color:rgba(0,0,0,0.6)">Financial Overview and key summaries</div>
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 rounded-xl border border-black/10 hover:bg-black/5 text-sm font-semibold transition">
              Export
            </button>
            <button class="px-4 py-2 rounded-xl text-white text-sm font-semibold transition" style="background:#0B1220;">
              View Reports
            </button>
          </div>
        </div>

        <!-- Row 2: Year Dropdown + Month Pills -->
        <div class="flex flex-wrap items-center gap-3">

          <!-- ── Year Dropdown ── -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold" style="color:rgba(0,0,0,0.5)">Year:</span>

            <!-- Custom dropdown wrapper -->
            <div class="relative" ref="yearDropdown">

              <!-- Trigger button — shows selected year as dark pill -->
              <button
                @click="yearDropdownOpen = !yearDropdownOpen"
                class="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 select-none"
                style="background:#0B1220; color:#C7EA2F; border-color:#0B1220; min-width:90px;"
              >
                <span>{{ selectedYear }}</span>
                <!-- chevron -->
                <svg
                  class="w-3 h-3 transition-transform duration-200"
                  :style="yearDropdownOpen ? 'transform:rotate(180deg)' : ''"
                  fill="none" stroke="currentColor" stroke-width="2.5"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              <!-- Dropdown panel -->
              <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="opacity-0 -translate-y-1 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-1 scale-95"
              >
                <div
                  v-if="yearDropdownOpen"
                  class="absolute top-full left-0 mt-2 z-50 rounded-2xl shadow-xl border border-black/10 overflow-hidden"
                  style="background:#fff; min-width:130px;"
                >
                  <div
                    v-for="y in years"
                    :key="y"
                    @click="selectYear(y); yearDropdownOpen = false"
                    class="flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm font-semibold transition-all duration-150"
                    :style="selectedYear === y
                      ? 'background:#0B1220; color:#C7EA2F;'
                      : 'color:#0B1220;'"
                    :class="selectedYear !== y ? 'hover:bg-black/5' : ''"
                  >
                    <span>{{ y }}</span>
                    <!-- checkmark for selected -->
                    <svg v-if="selectedYear === y" class="w-3.5 h-3.5" fill="none" stroke="#C7EA2F"
                         stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Divider -->
          <div class="h-5 w-px" style="background:rgba(0,0,0,0.15)"></div>

          <!-- ── Month Pills ── -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-semibold" style="color:rgba(0,0,0,0.5)">Month:</span>
            <button
              v-for="m in availableMonths"
              :key="m.key"
              @click="selectMonth(m.key)"
              class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border"
              :style="selectedMonth === m.key
                ? 'background:#C7EA2F; color:#0B1220; border-color:#C7EA2F;'
                : 'background:transparent; color:rgba(0,0,0,0.6); border-color:rgba(0,0,0,0.15);'"
            >
              {{ m.label }}
            </button>
          </div>

        </div>
      </div>

      <!-- ── KPI Cards ─────────────────────────────────────────── -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <div
          v-for="kpi in currentMonthData.kpiCards"
          :key="kpi.label"
          class="rounded-3xl border border-black/10 p-4 shadow-sm transition-all duration-300"
        >
          <div class="flex items-center justify-between">
            <div class="text-xs font-semibold" style="color:rgba(0,0,0,0.6)">{{ kpi.label }}</div>
            <span class="w-9 h-9 rounded-2xl grid place-items-center text-lg" style="background:#C7EA2F;">{{ kpi.icon }}</span>
          </div>
          <div class="mt-2 text-2xl font-extrabold text-black">{{ kpi.value }}</div>
          <div class="text-xs mt-1" :class="kpi.trend === 'up' ? 'text-green-700' : 'text-red-700'">
            {{ kpi.trend === 'up' ? '▲' : '▼' }} {{ kpi.change }} vs last month
          </div>
        </div>
      </div>

      <!-- ── Financial Overview + Cash Flow ───────────────────── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

        <!-- Financial Overview -->
        <div class="lg:col-span-2 rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-lg font-extrabold text-black">Financial Overview</div>
              <div class="text-sm" style="color:rgba(0,0,0,0.6)">
                Sales vs Purchases — last 6 months of {{ selectedYear }}
              </div>
            </div>
            <span class="w-10 h-10 rounded-2xl grid place-items-center text-lg" style="background:#C7EA2F;">📊</span>
          </div>

          <!-- SVG Bar Chart -->
          <div class="mt-4 rounded-2xl border border-black/10 p-4" style="background:rgba(0,0,0,0.03)">
            <div class="flex items-center justify-between mb-3">
              <div class="text-xs font-semibold" style="color:rgba(0,0,0,0.6)">Monthly Sales vs Purchases</div>
              <div class="flex items-center gap-4 text-xs">
                <span class="flex items-center gap-1">
                  <span class="w-3 h-3 rounded-full inline-block" style="background:#C7EA2F;"></span> Sales
                </span>
                <span class="flex items-center gap-1">
                  <span class="w-3 h-3 rounded-full inline-block" style="background:#0B1220;"></span> Purchases
                </span>
              </div>
            </div>
            <div class="w-full" style="height:176px;">
              <svg viewBox="0 0 600 180" class="w-full h-full" preserveAspectRatio="none">
                <line v-for="i in 4" :key="i" :x1="0" :y1="i*32" :x2="600" :y2="i*32"
                      stroke="rgba(0,0,0,0.07)" stroke-width="1"/>
                <g v-for="(bar, idx) in chartData" :key="bar.month + idx">
                  <rect :x="idx*100+15" :y="140-bar.salesHeight"
                        :width="32" :height="bar.salesHeight" rx="4"
                        :fill="bar.isSelected ? '#a8c900' : '#C7EA2F'"
                        :opacity="bar.isSelected ? 1 : 0.5"/>
                  <rect :x="idx*100+53" :y="140-bar.purchasesHeight"
                        :width="32" :height="bar.purchasesHeight" rx="4"
                        fill="#0B1220"
                        :opacity="bar.isSelected ? 1 : 0.32"/>
                  <circle v-if="bar.isSelected" :cx="idx*100+50" :cy="148" r="3" fill="#C7EA2F"/>
                  <text :x="idx*100+50" y="165" text-anchor="middle" font-size="11"
                        :fill="bar.isSelected ? '#0B1220' : 'rgba(0,0,0,0.4)'"
                        :font-weight="bar.isSelected ? 'bold' : 'normal'">
                    {{ bar.month }}
                  </text>
                </g>
              </svg>
            </div>
          </div>

          <!-- Sales & Purchase Summary -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="rounded-2xl border border-black/10 p-4">
              <div class="flex items-center justify-between">
                <div class="font-bold text-black">Sales Summary</div>
                <span class="text-xs px-2 py-1 rounded-full font-semibold" style="background:#C7EA2F;">
                  {{ selectedMonthLabel }} {{ selectedYear }}
                </span>
              </div>
              <div class="mt-3 grid grid-cols-3 gap-2">
                <div class="rounded-2xl p-3 border border-black/10">
                  <div class="text-xs" style="color:rgba(0,0,0,0.6)">Invoices</div>
                  <div class="text-lg font-extrabold text-black">{{ currentMonthData.salesSummary.invoices }}</div>
                </div>
                <div class="rounded-2xl p-3 border border-black/10">
                  <div class="text-xs" style="color:rgba(0,0,0,0.6)">AOV</div>
                  <div class="text-lg font-extrabold text-black">{{ currentMonthData.salesSummary.aov }}</div>
                </div>
                <div class="rounded-2xl p-3 border border-black/10">
                  <div class="text-xs" style="color:rgba(0,0,0,0.6)">Paid%</div>
                  <div class="text-lg font-extrabold text-black">{{ currentMonthData.salesSummary.paidPercent }}</div>
                </div>
              </div>
            </div>
            <div class="rounded-2xl border border-black/10 p-4">
              <div class="flex items-center justify-between">
                <div class="font-bold text-black">Purchase Summary</div>
                <span class="text-xs px-2 py-1 rounded-full font-semibold" style="background:#C7EA2F;">
                  {{ selectedMonthLabel }} {{ selectedYear }}
                </span>
              </div>
              <div class="mt-3 grid grid-cols-3 gap-2">
                <div class="rounded-2xl p-3 border border-black/10">
                  <div class="text-xs" style="color:rgba(0,0,0,0.6)">Bills</div>
                  <div class="text-lg font-extrabold text-black">{{ currentMonthData.purchaseSummary.bills }}</div>
                </div>
                <div class="rounded-2xl p-3 border border-black/10">
                  <div class="text-xs" style="color:rgba(0,0,0,0.6)">Avg Bill</div>
                  <div class="text-lg font-extrabold text-black">{{ currentMonthData.purchaseSummary.avgBill }}</div>
                </div>
                <div class="rounded-2xl p-3 border border-black/10">
                  <div class="text-xs" style="color:rgba(0,0,0,0.6)">Due</div>
                  <div class="text-lg font-extrabold text-black">{{ currentMonthData.purchaseSummary.due }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cash Flow Snapshot -->
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-lg font-extrabold text-black">Cash Flow Snapshot</div>
              <div class="text-sm" style="color:rgba(0,0,0,0.6)">
                In vs Out — {{ selectedMonthLabel }} {{ selectedYear }}
              </div>
            </div>
            <span class="w-10 h-10 rounded-2xl grid place-items-center text-lg" style="background:#C7EA2F;">💳</span>
          </div>
          <div class="mt-4 space-y-3">
            <div class="p-4 rounded-2xl border border-black/10">
              <div class="flex items-center justify-between text-sm">
                <span class="font-semibold text-black">Cash In</span>
                <span class="font-extrabold text-black">{{ currentMonthData.cashFlow.cashIn }}</span>
              </div>
              <div class="mt-2 h-2 rounded-full overflow-hidden" style="background:rgba(0,0,0,0.1)">
                <div class="h-2 rounded-full"
                     :style="{ width: currentMonthData.cashFlow.cashInPercent + '%', background: '#C7EA2F', transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)' }">
                </div>
              </div>
            </div>
            <div class="p-4 rounded-2xl border border-black/10">
              <div class="flex items-center justify-between text-sm">
                <span class="font-semibold text-black">Cash Out</span>
                <span class="font-extrabold text-black">{{ currentMonthData.cashFlow.cashOut }}</span>
              </div>
              <div class="mt-2 h-2 rounded-full overflow-hidden" style="background:rgba(0,0,0,0.1)">
                <div class="h-2 rounded-full"
                     :style="{ width: currentMonthData.cashFlow.cashOutPercent + '%', background: '#0B1220', transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)' }">
                </div>
              </div>
            </div>
            <div class="p-4 rounded-2xl border border-black/10">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-xs" style="color:rgba(0,0,0,0.6)">Net Flow</div>
                  <div class="text-xl font-extrabold text-black">{{ currentMonthData.cashFlow.netFlow }}</div>
                </div>
                <button class="px-3 py-2 rounded-xl text-sm font-semibold text-white transition" style="background:#0B1220;">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Bottom 3 Cards (Year-only, not month) ─────────────── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">

        <!-- Inventory Status -->
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-lg font-extrabold text-black">Inventory Status</div>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-sm" style="color:rgba(0,0,0,0.6)">Low stock alerts</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style="background:#0B1220; color:#C7EA2F;">
                  {{ selectedYear }}
                </span>
              </div>
            </div>
            <span class="w-10 h-10 rounded-2xl grid place-items-center text-lg" style="background:#C7EA2F;">📦</span>
          </div>
          <div class="mt-4 space-y-3">
            <div
              v-for="item in currentYearData.inventoryItems"
              :key="item.sku"
              class="p-3 rounded-2xl border border-black/10 flex items-center justify-between"
            >
              <div>
                <div class="font-semibold text-black text-sm">{{ item.name }}</div>
                <div class="text-xs" style="color:rgba(0,0,0,0.5)">SKU: {{ item.sku }}</div>
              </div>
              <span class="text-xs px-2 py-1 rounded-full font-semibold border"
                    :class="item.status === 'Low'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : item.status === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-green-50 text-green-700 border-green-200'">
                {{ item.status }}
              </span>
            </div>
          </div>
          <button class="mt-4 w-full py-2.5 rounded-2xl font-semibold text-white transition" style="background:#0B1220;">
            Manage Inventory
          </button>
        </div>

        <!-- Outstanding Receivables -->
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-lg font-extrabold text-black">Outstanding Receivables</div>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-sm" style="color:rgba(0,0,0,0.6)">Customers who need to pay</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style="background:#0B1220; color:#C7EA2F;">
                  {{ selectedYear }}
                </span>
              </div>
            </div>
            <span class="w-10 h-10 rounded-2xl grid place-items-center text-lg" style="background:#C7EA2F;">🧑‍💼</span>
          </div>
          <div class="mt-4 overflow-hidden rounded-2xl border border-black/10">
            <table class="w-full text-sm">
              <thead style="background:rgba(0,0,0,0.05); color:rgba(0,0,0,0.7)">
                <tr>
                  <th class="text-left p-3 font-semibold">Customer</th>
                  <th class="text-right p-3 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rec in currentYearData.receivables" :key="rec.customer"
                    class="border-t border-black/10 hover:bg-black/[0.02] transition">
                  <td class="p-3">
                    <div class="font-semibold text-black">{{ rec.customer }}</div>
                    <div class="text-xs" style="color:rgba(0,0,0,0.5)">Due: {{ rec.dueIn }}</div>
                  </td>
                  <td class="p-3 text-right font-extrabold text-black">{{ rec.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="mt-4 w-full py-2.5 rounded-2xl font-semibold border border-black/10 hover:bg-black/5 transition">
            Send Reminders
          </button>
        </div>

        <!-- Outstanding Payables -->
        <div class="rounded-3xl border border-black/10 p-5 shadow-sm">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-lg font-extrabold text-black">Outstanding Payables</div>
              <div class="flex items-center gap-2 mt-0.5">
                <span class="text-sm" style="color:rgba(0,0,0,0.6)">Bills you need to pay</span>
                <span class="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style="background:#0B1220; color:#C7EA2F;">
                  {{ selectedYear }}
                </span>
              </div>
            </div>
            <span class="w-10 h-10 rounded-2xl grid place-items-center text-lg" style="background:#C7EA2F;">🏦</span>
          </div>
          <div class="mt-4 overflow-hidden rounded-2xl border border-black/10">
            <table class="w-full text-sm">
              <thead style="background:rgba(0,0,0,0.05); color:rgba(0,0,0,0.7)">
                <tr>
                  <th class="text-left p-3 font-semibold">Supplier</th>
                  <th class="text-right p-3 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pay in currentYearData.payables" :key="pay.supplier"
                    class="border-t border-black/10 hover:bg-black/[0.02] transition">
                  <td class="p-3">
                    <div class="font-semibold text-black">{{ pay.supplier }}</div>
                    <div class="text-xs" style="color:rgba(0,0,0,0.5)">Due: {{ pay.dueIn }}</div>
                  </td>
                  <td class="p-3 text-right font-extrabold text-black">{{ pay.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="mt-4 w-full py-2.5 rounded-2xl font-semibold text-white transition" style="background:#0B1220;">
            Pay Bills
          </button>
        </div>

      </div>

      <div class="mt-6 text-center text-xs" style="color:rgba(0,0,0,0.6)">
        © 2026 Sri Lanka Q Books
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '~/stores/modules/userStore';
import { useQbookStore } from '~/stores/modules/qbook/qbookStore';

const MONTH_ORDER = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];

const ALL_MONTHS = [
  { key:'jan', label:'Jan' }, { key:'feb', label:'Feb' }, { key:'mar', label:'Mar' },
  { key:'apr', label:'Apr' }, { key:'may', label:'May' }, { key:'jun', label:'Jun' },
  { key:'jul', label:'Jul' }, { key:'aug', label:'Aug' }, { key:'sep', label:'Sep' },
  { key:'oct', label:'Oct' }, { key:'nov', label:'Nov' }, { key:'dec', label:'Dec' },
];

// ── Year-level data (Inventory, Receivables, Payables) ────────────────
const YEAR_DATA = {
  2024: {
    inventoryItems: [
      { name: 'Printer Paper A4',  sku: 'PAP-A4-01', status: 'Good'   },
      { name: 'Toner Cartridge',   sku: 'TON-02',    status: 'Good'   },
      { name: 'Stapler Set',       sku: 'STA-03',    status: 'Medium' },
      { name: 'Whiteboard Marker', sku: 'WBM-04',    status: 'Good'   },
    ],
    receivables: [
      { customer: 'Nimal Stores', dueIn: '15 days', amount: 'LKR 220,000' },
      { customer: 'Blue Wave',    dueIn: '10 days', amount: 'LKR 110,000' },
      { customer: 'Green Hub',    dueIn: '6 days',  amount: 'LKR 75,000'  },
    ],
    payables: [
      { supplier: 'Sunrise Traders', dueIn: '12 days', amount: 'LKR 180,000' },
      { supplier: 'Kandy Supplies',  dueIn: '8 days',  amount: 'LKR 95,000'  },
      { supplier: 'Peak Logistics',  dueIn: '5 days',  amount: 'LKR 60,000'  },
    ],
  },
  2025: {
    inventoryItems: [
      { name: 'Printer Paper A4',  sku: 'PAP-A4-01', status: 'Medium' },
      { name: 'Toner Cartridge',   sku: 'TON-02',    status: 'Low'    },
      { name: 'Stapler Set',       sku: 'STA-03',    status: 'Good'   },
      { name: 'Whiteboard Marker', sku: 'WBM-04',    status: 'Medium' },
      { name: 'Copy Paper Ream',   sku: 'CPR-05',    status: 'Low'    },
    ],
    receivables: [
      { customer: 'Nimal Stores', dueIn: '7 days', amount: 'LKR 185,000' },
      { customer: 'Blue Wave',    dueIn: '3 days', amount: 'LKR 92,500'  },
      { customer: 'Green Hub',    dueIn: '1 day',  amount: 'LKR 45,000'  },
      { customer: 'Apex Trading', dueIn: '5 days', amount: 'LKR 130,000' },
    ],
    payables: [
      { supplier: 'Sunrise Traders', dueIn: '5 days', amount: 'LKR 140,000' },
      { supplier: 'Kandy Supplies',  dueIn: '2 days', amount: 'LKR 88,900'  },
      { supplier: 'Peak Logistics',  dueIn: '4 days', amount: 'LKR 55,500'  },
      { supplier: 'Lanka Freight',   dueIn: '6 days', amount: 'LKR 72,000'  },
    ],
  },
  2026: {
    inventoryItems: [
      { name: 'Printer Paper A4',  sku: 'PAP-A4-01', status: 'Low'    },
      { name: 'Toner Cartridge',   sku: 'TON-02',    status: 'Low'    },
      { name: 'Stapler Set',       sku: 'STA-03',    status: 'Medium' },
      { name: 'Whiteboard Marker', sku: 'WBM-04',    status: 'Low'    },
      { name: 'Copy Paper Ream',   sku: 'CPR-05',    status: 'Good'   },
      { name: 'Ink Cartridge Set', sku: 'ICS-06',    status: 'Medium' },
    ],
    receivables: [
      { customer: 'Nimal Stores', dueIn: '5 days', amount: 'LKR 280,000' },
      { customer: 'Blue Wave',    dueIn: '3 days', amount: 'LKR 165,000' },
      { customer: 'Green Hub',    dueIn: '1 day',  amount: 'LKR 95,000'  },
      { customer: 'Apex Trading', dueIn: '7 days', amount: 'LKR 210,000' },
      { customer: 'Delta Corp',   dueIn: '2 days', amount: 'LKR 88,000'  },
    ],
    payables: [
      { supplier: 'Sunrise Traders', dueIn: '4 days', amount: 'LKR 210,000' },
      { supplier: 'Kandy Supplies',  dueIn: '2 days', amount: 'LKR 140,000' },
      { supplier: 'Peak Logistics',  dueIn: '1 day',  amount: 'LKR 88,000'  },
      { supplier: 'Lanka Freight',   dueIn: '6 days', amount: 'LKR 115,000' },
    ],
  },
};

// ── Helper to build month data ────────────────────────────────────────
const md = (kpi, s, p, cf) => ({
  kpiCards: [
    { label:'Cash Balance',    icon:'💰', value:`LKR ${kpi[0]}`, change:kpi[4], trend:kpi[5]  },
    { label:'Sales (MTD)',     icon:'📈', value:`LKR ${kpi[1]}`, change:kpi[6], trend:'up'    },
    { label:'Purchases (MTD)',icon:'🧾', value:`LKR ${kpi[2]}`, change:kpi[7], trend:'down'  },
    { label:'Net Profit (MTD)',icon:'✅', value:`LKR ${kpi[3]}`, change:kpi[8], trend:kpi[9]  },
  ],
  salesSummary:    { invoices:s[0], aov:s[1], paidPercent:s[2] },
  purchaseSummary: { bills:p[0], avgBill:p[1], due:p[2] },
  cashFlow: { cashIn:`LKR ${cf[0]}`, cashOut:`LKR ${cf[1]}`, netFlow:`+ LKR ${cf[2]}`, cashInPercent:cf[3], cashOutPercent:cf[4] },
});

const MONTHLY_DATA = {
  2024: {
    jan: md(['750,000','1,800,000','1,100,000','520,000','1.5%','up','3.2%','0.8%','2.0%','up'],   [65,'22K','63%'],[35,'17K','210K'],['310,000','220,000','90,000',45,31]),
    feb: md(['820,000','2,100,000','1,300,000','610,000','9.3%','up','16.7%','18.2%','17.3%','up'],[72,'24K','67%'],[42,'18K','240K'],['370,000','265,000','105,000',52,37]),
    mar: md(['890,000','2,400,000','1,450,000','680,000','8.5%','up','14.3%','11.5%','11.5%','up'],[80,'26K','70%'],[48,'19K','265K'],['420,000','300,000','120,000',58,42]),
    apr: md(['950,000','2,650,000','1,580,000','750,000','6.7%','up','10.4%','8.9%','10.3%','up'],[88,'27K','72%'],[52,'20K','290K'],['460,000','330,000','130,000',61,45]),
    may: md(['880,000','2,450,000','1,480,000','690,000','7.4%','down','7.5%','6.3%','8.0%','down'],[82,'25K','69%'],[50,'19K','275K'],['425,000','310,000','115,000',56,40]),
    jun: md(['810,000','2,200,000','1,380,000','620,000','8.0%','down','10.2%','6.8%','10.1%','down'],[75,'23K','66%'],[46,'18K','255K'],['390,000','285,000','105,000',52,38]),
    jul: md(['870,000','2,350,000','1,420,000','660,000','7.4%','up','6.8%','2.9%','6.5%','up'],   [78,'24K','68%'],[48,'18K','262K'],['405,000','295,000','110,000',54,39]),
    aug: md(['920,000','2,500,000','1,500,000','710,000','5.7%','up','6.4%','5.6%','7.6%','up'],   [82,'25K','70%'],[51,'19K','278K'],['430,000','315,000','115,000',57,41]),
    sep: md(['870,000','2,380,000','1,460,000','670,000','5.4%','down','4.8%','2.7%','5.6%','down'],[79,'24K','68%'],[50,'19K','270K'],['415,000','305,000','110,000',55,40]),
    oct: md(['830,000','2,250,000','1,400,000','630,000','4.6%','down','5.5%','4.1%','6.0%','down'],[76,'23K','67%'],[48,'18K','260K'],['395,000','290,000','105,000',53,39]),
    nov: md(['900,000','2,420,000','1,470,000','680,000','8.4%','up','7.6%','5.0%','7.9%','up'],   [80,'24K','69%'],[50,'19K','272K'],['420,000','308,000','112,000',56,41]),
    dec: md(['1,050,000','3,100,000','1,800,000','880,000','16.7%','up','28.1%','22.4%','29.4%','up'],[98,'30K','81%'],[62,'22K','355K'],['560,000','390,000','170,000',70,49]),
  },
  2025: {
    jan: md(['980,000','2,400,000','1,500,000','700,000','2.1%','up','4.5%','1.2%','3.0%','up'],        [88,'27K','70%'],[44,'18K','290K'],['420,000','310,000','110,000',60,44]),
    feb: md(['1,050,000','2,800,000','1,700,000','820,000','7.1%','up','8.5%','2.5%','5.0%','up'],      [102,'28K','73%'],[51,'20K','320K'],['490,000','360,000','130,000',65,48]),
    mar: md(['1,245,000','3,980,500','2,145,900','1,120,300','6.2%','up','12.4%','3.1%','9.0%','up'],   [128,'31K','78%'],[64,'22K','410K'],['620,000','455,000','165,000',70,52]),
    apr: md(['1,380,000','4,200,000','2,300,000','1,250,000','10.8%','up','5.5%','7.2%','11.6%','up'],  [140,'30K','82%'],[70,'21K','380K'],['700,000','500,000','200,000',78,56]),
    may: md(['1,100,000','3,600,000','2,050,000','950,000','4.3%','up','2.1%','1.8%','3.4%','up'],      [115,'29K','75%'],[58,'20K','350K'],['560,000','420,000','140,000',63,47]),
    jun: md(['920,000','3,100,000','1,900,000','800,000','1.5%','down','3.2%','0.8%','2.1%','down'],    [99,'26K','68%'],[55,'19K','400K'],['480,000','390,000','90,000',54,44]),
    jul: md(['1,010,000','3,450,000','2,000,000','880,000','9.8%','up','11.3%','5.3%','10.0%','up'],    [110,'28K','76%'],[60,'21K','360K'],['530,000','400,000','130,000',60,45]),
    aug: md(['1,150,000','3,780,000','2,100,000','1,020,000','13.9%','up','9.6%','5.0%','15.9%','up'],  [120,'30K','80%'],[62,'21K','390K'],['590,000','430,000','160,000',67,49]),
    sep: md(['1,090,000','3,620,000','2,020,000','970,000','5.2%','up','4.3%','3.9%','6.4%','up'],      [117,'29K','77%'],[59,'20K','370K'],['570,000','415,000','155,000',64,47]),
    oct: md(['870,000','2,950,000','1,750,000','720,000','3.2%','down','5.5%','2.0%','4.1%','down'],    [95,'26K','71%'],[52,'19K','310K'],['450,000','350,000','100,000',51,40]),
    nov: md(['1,200,000','3,850,000','2,080,000','1,080,000','8.7%','up','7.4%','4.5%','9.3%','up'],    [125,'30K','79%'],[63,'22K','400K'],['610,000','450,000','160,000',69,51]),
    dec: md(['1,450,000','5,100,000','2,800,000','1,550,000','20.8%','up','32.5%','34.6%','43.5%','up'],[165,'36K','88%'],[80,'26K','520K'],['890,000','620,000','270,000',90,63]),
  },
  2026: {
    jan: md(['1,280,000','4,500,000','2,400,000','1,380,000','5.5%','up','8.6%','4.1%','6.3%','up'],   [145,'32K','83%'],[71,'22K','440K'],['780,000','550,000','230,000',82,58]),
    feb: md(['1,350,000','4,800,000','2,550,000','1,460,000','5.5%','up','6.7%','6.3%','5.8%','up'],   [152,'33K','84%'],[74,'23K','465K'],['820,000','580,000','240,000',84,60]),
    mar: md(['1,420,000','5,100,000','2,700,000','1,560,000','5.2%','up','6.3%','5.9%','6.8%','up'],   [160,'34K','85%'],[78,'24K','490K'],['865,000','610,000','255,000',86,62]),
    apr: md(['1,500,000','5,400,000','2,850,000','1,650,000','5.6%','up','5.9%','5.6%','5.8%','up'],   [168,'35K','86%'],[82,'25K','515K'],['910,000','640,000','270,000',88,64]),
    may: md(['1,420,000','5,100,000','2,700,000','1,560,000','5.3%','down','5.6%','5.3%','5.5%','down'],[162,'34K','85%'],[79,'24K','495K'],['870,000','615,000','255,000',85,61]),
    jun: md(['1,380,000','4,900,000','2,620,000','1,490,000','2.8%','down','3.9%','3.0%','4.5%','down'],[156,'33K','84%'],[76,'23K','478K'],['840,000','595,000','245,000',83,59]),
    jul: md(['1,450,000','5,200,000','2,750,000','1,600,000','5.1%','up','6.1%','4.9%','7.4%','up'],   [165,'34K','86%'],[80,'24K','500K'],['890,000','625,000','265,000',86,62]),
    aug: md(['1,520,000','5,450,000','2,880,000','1,680,000','4.8%','up','4.8%','4.7%','5.0%','up'],   [172,'35K','87%'],[84,'25K','525K'],['930,000','655,000','275,000',88,64]),
    sep: md(['1,480,000','5,300,000','2,800,000','1,630,000','3.9%','down','2.8%','2.8%','3.0%','down'],[168,'34K','86%'],[82,'24K','512K'],['905,000','640,000','265,000',87,63]),
    oct: md(['1,400,000','5,000,000','2,680,000','1,540,000','5.4%','down','5.7%','4.3%','5.5%','down'],[159,'33K','84%'],[78,'23K','490K'],['860,000','610,000','250,000',83,59]),
    nov: md(['1,560,000','5,600,000','2,950,000','1,750,000','11.4%','up','12.0%','10.1%','13.6%','up'],[178,'36K','88%'],[88,'26K','545K'],['960,000','675,000','285,000',90,65]),
    dec: md(['1,850,000','7,200,000','3,700,000','2,200,000','18.6%','up','28.6%','25.4%','25.7%','up'],[220,'40K','92%'],[108,'30K','680K'],['1,200,000','820,000','380,000',95,72]),
  },
};

export default {
  data() {
    const now = new Date();
    const currentYear  = now.getFullYear();
    const defaultYear  = [2024, 2025, 2026].includes(currentYear) ? currentYear : 2026;
    const defaultMonth = MONTH_ORDER[now.getMonth()];

    return {
      selectedYear:     defaultYear,
      selectedMonth:    defaultMonth,
      yearDropdownOpen: false,
      years: [2024, 2025, 2026],
    };
  },

  computed: {
    availableMonths() {
      return ALL_MONTHS;
    },

    selectedMonthLabel() {
      return ALL_MONTHS.find(m => m.key === this.selectedMonth)?.label || '';
    },

    currentMonthData() {
      return MONTHLY_DATA[this.selectedYear]?.[this.selectedMonth]
          || MONTHLY_DATA[2026].jun;
    },

    currentYearData() {
      return YEAR_DATA[this.selectedYear] || YEAR_DATA[2026];
    },

    chartData() {
      const selectedIdx = MONTH_ORDER.indexOf(this.selectedMonth);
      const last6 = [];
      for (let i = 5; i >= 0; i--) {
        const idx = selectedIdx - i;
        last6.push(idx >= 0 ? MONTH_ORDER[idx] : null);
      }

      const validKeys = last6.filter(Boolean);
      const allS = validKeys.map(k => parseInt(MONTHLY_DATA[this.selectedYear][k].kpiCards[1].value.replace(/[^0-9]/g,'')));
      const allP = validKeys.map(k => parseInt(MONTHLY_DATA[this.selectedYear][k].kpiCards[2].value.replace(/[^0-9]/g,'')));
      const maxVal = Math.max(...allS, ...allP, 1);

      return last6.map(k => {
        if (!k) return { month:'', salesHeight:0, purchasesHeight:0, isSelected:false };
        const d = MONTHLY_DATA[this.selectedYear][k];
        const s = parseInt(d.kpiCards[1].value.replace(/[^0-9]/g,''));
        const p = parseInt(d.kpiCards[2].value.replace(/[^0-9]/g,''));
        return {
          month:           ALL_MONTHS.find(m => m.key === k)?.label,
          salesHeight:     Math.round((s / maxVal) * 130),
          purchasesHeight: Math.round((p / maxVal) * 130),
          isSelected:      k === this.selectedMonth,
        };
      });
    },
  },

  methods: {
    selectYear(y) {
      this.selectedYear = y;
      this.yearDropdownOpen = false;
    },

    selectMonth(key) {
      this.selectedMonth = key;
    },

    // Close dropdown when clicking outside
    handleOutsideClick(e) {
      if (this.$refs.yearDropdown && !this.$refs.yearDropdown.contains(e.target)) {
        this.yearDropdownOpen = false;
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },

  async created() {
    this.userStore  = useUserStore();
    this.qbookStore = useQbookStore();
  },

  head() {
    return { title: 'Dashboard – QBook' };
  },
};
</script>