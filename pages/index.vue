<template>
  <div class="min-h-screen p-6 ">
    <!-- Header -->
    <div class="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
      <h2 class="mb-4 text-2xl font-bold text-gray-800 sm:mb-0">Cashflow</h2>
      <button class="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500">
        New Invoice
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-sm text-gray-500">Revenue</p>
        <p class="text-2xl font-bold">$405,091.00</p>
        <p class="text-sm text-green-500">+4.75%</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-sm text-gray-500">Overdue Invoices</p>
        <p class="text-2xl font-bold">$12,787.00</p>
        <p class="text-sm text-red-500">-5.02%</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-sm text-gray-500">Outstanding Invoices</p>
        <p class="text-2xl font-bold">$245,988.00</p>
        <p class="text-sm text-green-500">+1.39%</p>
      </div>
      <div class="p-4 bg-white rounded-lg shadow">
        <p class="text-sm text-gray-500">Expenses</p>
        <p class="text-2xl font-bold">$30,156.00</p>
        <p class="text-sm text-red-500">-10.81%</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="mb-6">
      
      <h3 class="mb-4 text-lg font-semibold text-gray-800">Recent Activity</h3>
      <div class="grid grid-cols-3">
      <div class="p-4 bg-white rounded-lg shadow">
        <div class="divide-y divide-gray-200">
          <div class="flex flex-col items-start justify-between py-3 sm:flex-row sm:items-center">
            <div>
              <p class="text-gray-700">$7,600.00 USD</p>
              <p class="text-sm text-gray-500">Paid - Reform</p>
            </div>
            <p class="mt-2 text-sm text-green-500 sm:mt-0">Paid</p>
          </div>
          <div class="flex flex-col items-start justify-between py-3 sm:flex-row sm:items-center">
            <div>
              <p class="text-gray-700">$10,000.00 USD</p>
              <p class="text-sm text-gray-500">Withdraw - Tom Cook</p>
            </div>
            <p class="mt-2 text-sm text-gray-500 sm:mt-0">Withdraw</p>
          </div>
          <div class="flex flex-col items-start justify-between py-3 sm:flex-row sm:items-center">
            <div>
              <p class="text-gray-700">$2,000.00 USD</p>
              <p class="text-sm text-gray-500">Overdue - Tuple</p>
            </div>
            <p class="mt-2 text-sm text-red-500 sm:mt-0">Overdue</p>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Recent Clients -->
    <div>
      <h3 class="mb-4 text-lg font-semibold text-gray-800">Recent Clients</h3>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div class="p-4 bg-white rounded-lg shadow">
          <p class="text-sm text-gray-500">Tuple</p>
          <p class="text-lg font-bold">$2,000.00</p>
          <p class="text-sm text-red-500">Overdue</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
          <p class="text-sm text-gray-500">SavvyCal</p>
          <p class="text-lg font-bold">$14,000.00</p>
          <p class="text-sm text-green-500">Paid</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow">
          <p class="text-sm text-gray-500">Reform</p>
          <p class="text-lg font-bold">$7,600.00</p>
          <p class="text-sm text-green-500">Paid</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
};
</script>

<style></style>
