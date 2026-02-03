<template>
  <div class="relative " ref="wrapper">

    <!-- Input Box -->
    <input
      readonly
      @click="open = true"
      :value="displayDate"
      placeholder="Select date"
      class="w-full px-4 py-2 rounded-lg border text-sm outline-none"
      :style="{
        borderColor: isFocused ? primaryColor : '',
        boxShadow: isFocused
          ? `0 0 0 2px ${primaryColor}33`
          : 'none'
      }"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />

    <!-- Calendar -->
    <div
      v-if="open"
      class="absolute z-50 mt-2 w-80 rounded-xl border shadow bg-white overflow-hidden"
    >
      <!-- Header -->
      <div
        class="text-white px-3 py-2 flex items-center justify-between"
        :style="{ backgroundColor: primaryColor }"
      >
        <button @click="prevMonth">◀</button>

        <div class="flex gap-2">
          <select
            v-model="month"
            class="text-white text-sm rounded px-2 py-1 outline-none"
            :style="{ backgroundColor: primaryLight }"
          >
            <option v-for="(m,i) in months" :key="i" :value="i">
              {{ m }}
            </option>
          </select>

          <select
            v-model="year"
            class="text-white text-sm rounded px-2 py-1 outline-none "
            :style="{ backgroundColor: primaryLight }"
          >
            <option class="h-32 overflow" v-for="y in years" :key="y" :value="y">
              {{ y }}
            </option>
          </select>
        </div>

        <button @click="nextMonth">▶</button>
      </div>

      <!-- Weekdays -->
      <div class="grid grid-cols-7 text-center text-xs py-2" :style="{ backgroundColor: primaryLight }">
        <span v-for="d in days" :key="d">{{ d }}</span>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-7 text-center text-sm p-2">
        <span
          v-for="cell in calendar"
          :key="cell.key"
          @click="selectDate(cell)"
          class="h-9 flex items-center justify-center rounded cursor-pointer"
          :class="[cell.current ? 'text-gray-800 hover:bg-[var(--primaryLight)]' : 'text-gray-300', isSelected(cell) ? 'text-white' : '']"
          :style="isSelected(cell) ? { backgroundColor: primaryColor } : {}"
        >
          {{ cell.day }}
        </span>
      </div>

      <div class="flex justify-between px-3 py-2 text-xs border-t">
        <button
          @click="clearDate"
          class="text-gray-500 hover:text-red-500"
        >
          Clear
        </button>
        <button
          @click="selectToday"
          class="font-semibold"
          :style="{ color: primaryColor }"
        >
          Today
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  emits: ['update'],
  props: {
    primaryColor: { type: String, default: '#2563eb' },
    primaryLight: { type: String, default: '#3b82f6' }
  },
  data() {
    const today = new Date()
    return {
      open: false,
      selected: null,
      month: today.getMonth(),
      year: today.getFullYear(),
      days: ['Su','Mo','Tu','We','Th','Fr','Sa'],
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      isFocused: false
    }
  },
  computed: {
    years() {
      const start = new Date().getFullYear() - 20
      return Array.from({ length: 50 }, (_, i) => start + i)
    },
    displayDate() {
      if (!this.selected) return ''
      // Format YYYY-MM-DD
      return this.selected.toLocaleDateString('en-CA')
    },
    calendar() {
      const first = new Date(this.year, this.month, 1).getDay()
      const total = new Date(this.year, this.month + 1, 0).getDate()
      const cells = []

      for (let i = 0; i < first; i++) {
        cells.push({ day: '', current: false, key: 'e'+i })
      }

      for (let d = 1; d <= total; d++) {
        cells.push({
          day: d,
          current: true,
          date: new Date(this.year, this.month, d),
          key: d
        })
      }
      return cells
    }
  },
  methods: {
    prevMonth() { this.month === 0 ? (this.month = 11, this.year--) : this.month-- },
    nextMonth() { this.month === 11 ? (this.month = 0, this.year++) : this.month++ },
    formatDate(date) {
      return date.toLocaleDateString('en-CA') // YYYY-MM-DD
    },
    selectDate(cell) {
      if (!cell.current) return
      this.selected = cell.date

      const formatted = this.formatDate(cell.date)
      this.$emit('update', formatted)

      this.open = false
    },
    selectToday() {
      const today = new Date()
      this.selected = today
      this.month = today.getMonth()
      this.year = today.getFullYear()

      this.$emit('update', this.formatDate(today))
      this.open = false
    },
    clearDate() {
      this.selected = null
      this.$emit('update', null)
      this.open = false
    },
    isSelected(cell) {
      return this.selected && cell.date &&
        this.selected.toDateString() === cell.date.toDateString()
    },
    handleOutside(e) {
      if (!this.$refs.wrapper.contains(e.target)) {
        this.open = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleOutside)
  }
}
</script>
