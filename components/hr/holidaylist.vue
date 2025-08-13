<template>
  <section class="justify-center min-h-screen px-4 mt-24 mb-20 lg:px-60 testmargin">
    <div class="cssholidayview  w-screen absolute mt-16 top-0 left-0 bg-white">
      <div class="w-3/4 bg-gray-500 mx-auto mt-8 rounded-md p-8 relative">
        <div class="cursor-pointer absolute top-0 right-0 m-8 flex gap-x-8">
          <holidayloader @click="loadholidays" />
          <div title="Exit Holiday View" class="text-SID-blue transform hover:scale-125 delay-75" @click="getclose">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div class="
            text-sm
            font-semibold
            uppercase
            bg-blue-600
            text-white
            px-4
            w-24
            text-center
            p-1
            rounded-md
          ">
          Holidays
        </div>

        <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 w-full lg:gap-x-16">
          <div class="">
            <!-- Start Heading  -->
            <div class="
                grid grid-cols-3
                lg:grid-cols-3
                text-center
                w-full
                text-white
                bg-blue-800
                rounded-t-md
                p-2
              ">
              <div>Date</div>
              <div>Holiday Description</div>

              <div></div>
            </div>
            <!-- End Heading  -->

            <!-- start rows  -->
            <div v-if="hrStore.holiday.arrholidays.length > 0">
              <div class="cssrows   overflow-y-scroll">
                <div v-for="holiday in hrStore.holiday.arrholidays" :key="holiday.id">
                  <!-- :index="index" -->
                  <div class="
                  grid grid-cols-3
                  lg:grid-cols-3
                  
                  w-full
                  text-white
                  bg-gray-600
                  rounded-md
                  mt-1
                  p-2
                ">
                    <div class="text-center">{{ holiday.date }}</div>
                    <div>{{ holiday.description }}</div>
                    <div title="Delete record" class="cursor-pointer" @click="deleteRecord(holiday.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-sm pt-2 text-gray-200">
              No holidays for selected month..
            </div>

            <!-- End rows  -->
          </div>
          <div class="bg-gray-600 rounded-md p-2  h-48 relative">
            <!-- Insert -->
            <div class="
                text-sm
                font-semibold
                uppercase
                bg-blue-600
                text-white
                w-32
                px-2
                p-1
                rounded-md
              ">
              Apply Holidays
            </div>

            <div class="flex mt-2 gap-y-2 ml-4">
              <div class="text-white text-sm w-24">Date</div>
              <div>
                <input class="text-SID-blue rounded p-1 w-64" type="date" v-model="holiday.date" />
              </div>
            </div>

            <div class="flex mt-2 gap-y-2 ml-4">
              <div class="text-white text-sm w-24">Description</div>
              <div>
                <input class="text-SID-blue  rounded p-1 w-64" v-model="holiday.description" type="text" />
              </div>
            </div>

            <div class="absolute bottom-0 right-0 m-4 flex gap-x-4">
              <btnhr_Save class="w-20 text-white" name="Clear" @click="getClear" />
              <btnhr_Save class="w-20 text-white" name="Save" @click="getSave" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import holidayloader from '~/components/hr/holidayloader'
import btnhr_Save from '~/components/hr/btnhr_button'
import { useHrStore } from '~/stores/modules/hrStore'

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
      hrStore: null,
      showLoading: null,
    }
  },

  async created() {
    this.hrStore = useHrStore();
    this.showLoading = this.$showLoading;
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
      await this.hrStore.getAssignedHolidays(req, this.showLoading);
    },

    async init() {
      var date = new Date();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let req = { month: month, year: year };
      await this.hrStore.getAssignedHolidays(req, this.showLoading);
    },

    async deleteRecord(id) {
      this.hrStore = useHrStore();

      this.$showConfirm("Sure to delete this record?", "warning")
        .then(async (result) => {
          if (result.isConfirmed) {
            let req = { id: id }
            await this.hrStore.getDeleteHoliday(req, this.showLoading)
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
            await this.hrStore.setAssignedHolidays(req, this.showLoading)

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