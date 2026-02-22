<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-24">
    <div class="text-2xl uppercase mb-6">Holidays</div>

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <div class="col-span-3 bg-white ">

        <!-- Load Button -->
        <div class="flex mb-4 rounded-xl shadow-sm border p-4">
          <holidayloader @click="loadholidays" />
        </div>

      <!-- Table -->
      <div class="overflow-hidden border rounded-xl">

        <!-- Header -->
        <div class="bg-gradient-to-r from-blue-700 to-blue-900 text-white font-semibold">
          <div class="grid grid-cols-3 px-6 py-3 text-sm text-center">
            <div>Date</div>
            <div>Description</div>
            <div>Action</div>
          </div>
        </div>

        <!-- Body -->
        <div class="divide-y max-h-[500px] overflow-y-auto bg-white">

          <div
            v-for="holiday in holidayStore.holiday.arrholidays"
            :key="holiday.id"
            class="grid grid-cols-3 px-6 py-4 text-sm text-center items-center hover:bg-blue-50 transition"
          >
            <!-- Date -->
            <div class="font-semibold text-gray-700">
              {{ holiday.date }}
            </div>

            <!-- Description -->
            <div class="text-gray-600">
              {{ holiday.description }}
            </div>

            <!-- Action -->
            <div class="flex justify-center gap-2">
              <button class="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md shadow">
                Delete
              </button>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="!holidayStore.holiday.arrholidays.length"
            class="text-center py-10 text-gray-400"
          >
            No holidays found
          </div>

        </div>
      </div>
    </div>

    <div class="col-span-2 bg-white border shadow-md rounded-2xl p-6">

      <!-- Header -->
      <div class="mb-3 border-b pb-3">
        <h2 class="text-lg font-semibold text-gray-700 tracking-wide">
          Add Holiday
        </h2>
      </div>

      <!-- Form -->
      <div class="space-y-5">

        <!-- Date -->
        <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
          <label class="text-sm font-medium text-gray-600">
            Holiday Date
          </label>

          <div class="md:col-span-2">
            <input
              type="date"
              v-model="holiday.date"
              class="w-full border rounded-lg px-3 py-2 text-sm
                    focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                    transition"
            />
          </div>
        </div>

        <!-- Description -->
        <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-3">
          <label class="text-sm font-medium text-gray-600">
            Description
          </label>

          <div class="md:col-span-2">
            <textarea
              type="text"
              v-model="holiday.description"
              placeholder="Ex: Sinhala & Tamil New Year"
              class="w-full border rounded-lg px-3 py-2 text-sm
                    focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                    transition"
            />
          </div>
        </div>

      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-3 mt-8 border-t pt-4">
        <button
          @click="getClear"
          class="px-4 py-1.5 text-sm bg-white text-black border border-gray-300
                rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          @click="getSave"
          class="px-5 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white border border-gray-300
                rounded-lg shadow-sm hover:bg-gray-100 transition"
        >
          Save
        </button>
      </div>

    </div>
    </div>

  </section>
</template>

<script>
import holidayloader from '~/components/customcontrol/hr/yearMonthSearch.vue'
import btnhr_Save from '~/components/customcontrol/hr/btn'
import { useHolidayStore } from '~/stores/modules/hr/holidayStore'

export default {
  components: { holidayloader, btnhr_Save },
  data() {
    return {
      holiday: {
        id: 0,
        date: '',
        description: '',
      },
      selectedMonth: "",
      selectedYear: "",
      holidayStore: null,
      showLoading: null,
    }
  },

  async created() {
    this.holidayStore = useHolidayStore();
    this.showLoading = this.$showLoading;

    this.init();
  },

  computed: {
  },

  methods: {
    getclose() {
      this.$emit('exitpopup')
    },

    async loadholidays(value) {
      console.log("loadholidays:", value.month, value.year);
      this.selectedMonth = value.month
      this.selectedYear = value.year

      let req = { month: value.month, year: value.year };
      await this.holidayStore.getAssignedHolidays(req, this.showLoading);
    },

    async init() {
      var date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let req = { month: month, year: year };
      await this.holidayStore.getAssignedHolidays(req, this.showLoading);
    },

    async deleteRecord(id) {
      this.holidayStore = useholidayStore();

      this.$showConfirm("Sure to delete this record?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = { id: id }
            await this.holidayStore.getDeleteHoliday(req, this.showLoading)
          }
        });
    },

    async getSave() {
      if (!this.validate()) { return }

      let req = {
        date: this.holiday.date,
        description: this.holiday.description,
      }

      this.$showConfirm("Sure to add this day as holiday?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.holidayStore.setAssignedHolidays(req, this.showLoading)

            this.getClear();
          }
        });
    },

    getClear() {
      this.holiday.id = 0
      this.holiday.date = ''
      this.holiday.description = ''
    },

    validate() {

      if (this.holiday.date == '') {
        this.show_error('Invalid Date');
        return false;
      }
      if (this.holiday.description == '') {
        this.show_error('Invalid Description');
        return false;
      }
      return true;
    },

    show_error(msg) {
      this.showMessage({
        type: 'Failed',
        message: msg,
      })
    },
  },
  mounted() { },
}
</script>

<style scoped>
.cssholidayview {
  min-height: 1500px;
}

.testmargin {
  margin-top: 10px;
}

.cssholidayview>div {
  min-height: 100vh;
}

.cssrows {
  height: 500px;
  scrollbar-width: thin;
}
</style>