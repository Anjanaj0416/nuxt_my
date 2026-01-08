<template>
  <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div v-for="(item, index) in accordions" :key="index">

      <!-- Header -->
      <button
        type="button"
        @click="toggleAccordion(index)"
        class="flex items-center justify-between w-full px-6 py-2 font-semibold
               bg-gradient-to-r from-indigo-50 to-purple-50
               hover:from-indigo-100 hover:to-purple-100 transition rounded-lg"
      >
        <div class="flex items-center gap-3">
        
          <span>Attendance</span>
        </div>

        <svg
          class="w-5 h-5 transition-transform duration-300"
          :class="activeIndex === index ? 'rotate-180' : ''"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path stroke="currentColor" stroke-width="2" d="m5 15 7-7 7 7"/>
        </svg>
      </button>

      <!-- Body -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-[500px]"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 max-h-[500px]"
        leave-to-class="opacity-0 max-h-0"
      >
        <div
          v-show="activeIndex === index"
          class="overflow-hidden border-t border-gray-200  px-6 py-5"
        >
            <div class="flex justify-end">
                <button 
                    type="button" 
                    class="text-white bg-brand hover:bg-brand-strong rounded-lg box-border bg-blue-500 border border-transparent text-xs px-3 py-1.5 focus:outline-none"
                >
                Edit
                </button>
            </div>
            <div
              v-if="welfareStore.listAttendence.length === 0"
              class="text-center text-gray-900 mt-5 text-sm font-medium"
            >
              <p>No ...</p>
            </div>
            <div class="grid grid-cols-1 gap-6 mt-2
              max-h-[300px] md:max-h-[300px] lg:max-h-[300px]
              overflow-y-auto pr-2"
            >
              <div 
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2"
                v-for="(list, index) in welfareStore.listAttendence"
              >
                  <div>
                    <p class="text-xs font-semibold text-gray-500 uppercase">date</p>
                    <p class="mt-1 text-sm font-sm text-gray-800">
                        {{ list.date }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-gray-500 uppercase">status</p>
                    <p class="mt-1 text-sm font-sm text-gray-800">
                        {{ list.status }}
                    </p>
                  </div>
                  
              </div>
            </div>
          <div>

          </div>
        </div>
      </transition>

    </div>
  </div>
</template>
<script>
import { useWelfareStore } from '~/stores/modules/welfare/welfareStore';
import { useUserStore } from '~/stores/modules/userStore';

export default {
  components: {},
  props:['id'],

  data() {
    return {
      activeIndex: null,
      accordions: [{}],
      memberInfo: [],
      imageroot: '',
      showLoading: null,
      dashboardStore: null,
      userStore: null,
      memberInfo: {
        name: '',
        nic: '',
        registered: '',
        birthday: '',
        phone: '',
      },
    }
  },

  async created() {
    this.showLoading = this.$showLoading
    this.userStore = useUserStore()
    this.welfareStore = useWelfareStore()
    this.imageroot = this.userStore.loggedUser.resourceURLRoot


  },

  mounted() {
    // optional: API calls / animations
  },

  methods: {
    async toggleAccordion(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null
      } else {
        this.activeIndex = index

        // load attendance when opened
        await this.welfareStore.memberDashboardDetail(this.id, this.showLoading)
      }
    }
  },

}
</script>



