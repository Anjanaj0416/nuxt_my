<template>
  <article>
    <div class="text-EF-green-100">
      <div
        class="cssTotInfo rounded p-2"
        :class="apptstatus === 'pending' ? 'bg-EF-blue' : 'bg-EF-blue'"
      >
        <!-- Total -->
        <div class="flex justify-between lg:w-64 lg:mx-auto">
          <div>Total</div>
          <div>{{ formatLKR(total) }}</div>
        </div>

        <!-- Discount -->
        <div class="flex justify-between lg:w-64 lg:mx-auto">
          <div>Discount</div>
          <div>
            <div v-if="ispaid === 1">{{ formatLKR(discount) }}</div>
            <input
              v-else
              type="text"
              class="text-right bg-EF-green-100 text-EF-blue px-2 rounded w-16"
              v-model.number="discount"
              @keyup="recalculate"
              @input="sanitizeNumber('discount')"
            />
          </div>
        </div>

        <!-- Cash -->
        <div class="flex justify-between lg:w-64 lg:mx-auto">
          <div>Cash</div>
          <div>
            <div v-if="ispaid === 1">{{ formatLKR(cash) }}</div>
            <input
              v-else
              type="text"
              class="text-right bg-EF-green-100 text-EF-blue px-2 rounded w-16"
              v-model.number="cash"
              @keyup="recalculate"
              @keypress.enter="recalculate"
              @input="sanitizeNumber('cash')"
            />
          </div>
        </div>

        <!-- Balance -->
        <div class="flex justify-between lg:w-64 lg:mx-auto">
          <div>Balance</div>
          <div>{{ formatLKR(balance) }}</div>
        </div>

        <!-- Credit Warning -->
        <div class="flex justify-end lg:w-64 lg:mx-auto animate-pulse">
          <div class="text-red-400" v-if="balance < 0">Credit Payment</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    appt_id: { type: [String, Number], required: true },
    total: { type: Number, default: 0 },
    cash: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    ispaid: { type: Number, default: 0 }, // 0 = editable, 1 = read-only
    apptstatus: { type: String, default: 'pending' },
  },
  methods: {
    // Clean numeric input
    sanitizeNumber(field) {
      if (this[field] === null || this[field] === undefined) this[field] = 0
      else {
        let val = this[field].toString()
        val = val.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
        this[field] = val === '' ? 0 : parseFloat(val)
      }
      this.recalculate()
    },

    // Recalculate balance
    recalculate() {
      const netTotal = this.total - this.discount
      this.balance = this.cash - netTotal
      this.$emit('billcalc', {
        appt_id: this.appt_id,
        discount: parseFloat(this.discount),
        cash: parseFloat(this.cash),
        balance: parseFloat(this.balance),
      })
    },

    // Format numbers using global filter
    formatLKR(val) {
      return this.$options.filters.toLKR ? this.$options.filters.toLKR(val) : val
    },
  },
}
</script>

<style scoped>
.cssTotInfo > div {
  @apply mb-1;
}
</style>
