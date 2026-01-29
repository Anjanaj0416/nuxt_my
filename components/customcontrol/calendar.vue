<template>
  <div class="relative " ref="wrapper">

    <!-- Input Box -->
    <input
      readonly
      @click="open = true"
      :value="displayDate"
      placeholder="Select date"
      class="w-full px-3 py-2 text-sm border rounded-md cursor-pointer
             focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />

    <!-- Calendar -->
    <div
      v-if="open"
      class="absolute z-50 mt-2 w-80 rounded-xl border shadow bg-white  overflow-hidden"
    >
      <!-- Header -->
      <div class="bg-blue-600 text-white px-3 py-2 flex items-center justify-between">
        <button @click="prevMonth">◀</button>

        <div class="flex gap-2">
          <select
            v-model="month"
            class="bg-blue-500 text-white text-sm rounded px-2 py-1 outline-none"
          >
            <option v-for="(m,i) in months" :key="i" :value="i">
              {{ m }}
            </option>
          </select>

          <select
            v-model="year"
            class="bg-blue-500 text-white text-sm rounded px-2 py-1 outline-none "
          >
            <option class="h-32 overflow" v-for="y in years" :key="y" :value="y">
              {{ y }}
            </option>
          </select>
        </div>

        <button @click="nextMonth">▶</button>
      </div>

      <!-- Weekdays -->
      <div class="grid grid-cols-7 text-center text-xs text-blue-600 py-2">
        <span v-for="d in days" :key="d">{{ d }}</span>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-7 text-center text-sm p-2">
        <span
          v-for="cell in calendar"
          :key="cell.key"
          @click="selectDate(cell)"
          class="h-9 flex items-center justify-center rounded cursor-pointer"
          :class="[
            cell.current ? 'text-gray-800 hover:bg-blue-50' : 'text-gray-300',
            isSelected(cell) ? 'bg-blue-600 text-white' : ''
          ]"
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
          class="text-blue-600 font-semibold"
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
  data() {
    const today = new Date()
    return {
      open: false,
      selected: null,
      month: today.getMonth(),
      year: today.getFullYear(),
      days: ['Su','Mo','Tu','We','Th','Fr','Sa'],
      months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    }
  },
  computed: {
    years() {
      const start = new Date().getFullYear() - 20
      return Array.from({ length: 50 }, (_, i) => start + i)
    },
    displayDate() {
      if (!this.selected) return ''
      return this.selected.toISOString().split('T')[0]
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
    prevMonth() {
      this.month === 0 ? (this.month = 11, this.year--) : this.month--
    },
    nextMonth() {
      this.month === 11 ? (this.month = 0, this.year++) : this.month++
    },
    selectDate(cell) {
      if (!cell.current) return
      this.selected = cell.date
      this.$emit('update', this.selected) // ✅ pass to parent
      this.open = false
    },
    selectToday() {
      const today = new Date()
      this.selected = today
      this.month = today.getMonth()
      this.year = today.getFullYear()
      this.$emit('update', today)
      this.open = false
    },
    clearDate() {
      this.selected = null
      this.$emit('update', null)
      this.open = false
    },
    isSelected(cell) {
      return this.selected &&
        cell.date &&
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




