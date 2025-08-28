<template>
  <article>
    <div class="page-wrapper font-sans">
      <page size="bill" class="cssbill text-sm cssborder bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Close button -->
        <div class="flex justify-end mr-4 notToPrint cursor-pointer" @click="closeBill">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <!-- Header -->
        <div class="px-3 text-center border-b-2 border-gray-400 pb-2">
          <img :src="bill.logo" class="w-auto h-16 mx-auto" alt="Company Logo" />
          <h1 class="text-lg font-bold text-gray-800 mt-1 uppercase">{{ bill.companyName }}</h1>
          <p class="text-xs text-gray-600">{{ bill.address }}</p>
          <p class="text-xs text-gray-600">Hotline: {{ bill.hotline }}</p>
        </div>

        <!-- Bill Info -->
        <div class="px-3 py-2 text-xs space-y-1 border-b border-dashed border-gray-400">
          <div class="flex justify-between"><span>Bill No:</span><span>{{ bill.billNo }}</span></div>
          <div class="flex justify-between"><span>Name:</span><span>{{ bill.name }}</span></div>
          <div class="flex justify-between"><span>Age / Sex:</span><span>{{ bill.age }} / {{ bill.sex }}</span></div>
          <div class="flex justify-between"><span>Date:</span><span>{{ bill.date }}</span></div>
          <div class="flex justify-between"><span>Time:</span><span>{{ bill.time }}</span></div>
          <div class="flex justify-between"><span>Operator:</span><span>{{ loggedUser.name }}</span></div>
        </div>

        <!-- Items -->
        <div class="px-3 py-2 text-xs">
          <div class="flex justify-between font-bold border-b border-gray-600 pb-1">
            <span>Description</span><span>Amount</span>
          </div>
          <div v-for="(item, index) in bill.items" :key="index" class="flex justify-between py-1 border-b border-dashed border-gray-300">
            <span class="truncate">{{ item.description }}</span>
            <span class="font-mono">{{ formatCurrency(item.amount) }}</span>
          </div>
        </div>

        <!-- Totals -->
        <div class="px-3 py-2 text-sm space-y-1">
          <div class="flex justify-between font-medium"><span>Gross Total</span><span>{{ formatCurrency(bill.grossTotal) }}</span></div>
          <div class="flex justify-between"><span>Discount</span><span>- {{ formatCurrency(bill.discount) }}</span></div>
          <div class="flex justify-between text-lg font-bold bg-gray-100 px-2 py-1 rounded-md">
            <span>Net Total</span><span>{{ formatCurrency(bill.netTotal) }}</span>
          </div>
          <div class="flex justify-between font-medium"><span>Payment</span><span>{{ formatCurrency(bill.payment) }}</span></div>
          
          <div v-if="bill.balance >= 0" class="flex justify-between text-green-600 font-semibold">
            <span>Balance</span><span>{{ formatCurrency(bill.balance) }}</span>
          </div>
          <div v-else class="flex justify-between text-red-600 font-semibold">
            <span>Credit</span><span>{{ formatCurrency(Math.abs(bill.balance)) }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-3 py-2 text-center border-t-2 border-gray-400 mt-2">
          <p class="text-sm font-bold text-gray-800">✨ Thank you - Come Again ✨</p>
          <p class="text-xs italic text-gray-600">"Your health is our concern!"</p>
          <p class="text-xs font-semibold text-gray-700">easyappts.lk | 070 505 2425</p>
        </div>
      </page>
    </div>
  </article>
</template>


<script>
import { useUserStore } from "~/stores/modules/userStore";

 definePageMeta({
    layout: 'POSLayout',   
    middleware: 'auth',
   });

export default {
  data() {
    return {
      assetsRoot: process.env.McleAssets || '/assets',
      bill: {
        logo: 'https://w7.pngwing.com/pngs/195/996/png-transparent-shopping-cart-computer-icons-online-shopping-symbol-shopping-logo-design-supermarket-bag-shopping-list.png',
        name: 'John Doe',           // matches template
        billNo: 'BILL-2025-001',    // matches template
        address: '123 Main Street, Colombo',
        hotline: '011 234 5678',
        age: 32,
        sex: 'Male',
        date: '2025-08-28',
        time: '14:30',
        items: [
          { description: 'Consultation', amount: 1500 },
          { description: 'Blood Test', amount: 500 },
          { description: 'X-Ray', amount: 1200 },
        ],
        grossTotal: 3200,
        discount: 200,
        netTotal: 3000,
        payment: 3000,
        balance: 0
      },
      loggedUser: {
        name: 'Operator 1'
      }
    }
  },
  created() {
    this.userStore = useUserStore();
    const granted = this.userStore.loggedUser?.granted || [];

    if (!granted.includes('pos')) {
      this.$router.push('/user/login');
      this.$showToast('Not Allowed to access this page', 'error');
      return;
    }
  },
  methods: {
    closeBill() {
      this.$emit('closebill');
    },
    formatCurrency(amount) {
      return 'LKR ' + amount.toLocaleString();
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* or center vertically if you want */
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5; /* optional, just for visual */
}

.cssbill {
  width: 320px; /* Thermal receipt width */
  max-width: 100%;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  padding: 10px;
  border-radius: 4px;
}

@media print {
  body * {
    visibility: hidden;
  }
  .cssbill, .cssbill * {
    visibility: visible;
  }
  .cssbill {
    position: absolute;
    left: 0;
    top: 0;
    width: 240px;
    box-shadow: none;
  }
}

</style>
