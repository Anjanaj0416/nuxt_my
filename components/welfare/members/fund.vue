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
        
          <span>Fund / Charity</span>
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
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Name</p>
                <p class="mt-1 text-sm font-medium text-gray-800">
                    {{ memberInfo.name }}
                </p>
                </div>
                <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Nic</p>
                <p class="mt-1 text-sm font-medium text-gray-800">
                    {{ memberInfo.nic }}
                </p>
                </div>
                <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Register Date</p>
                <p class="mt-1 text-sm font-medium text-gray-800">
                    {{ memberInfo.registered }}
                </p>
                </div>
                <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Birth day</p>
                <p class="mt-1 text-sm font-medium text-gray-800">
                    {{ memberInfo.birthday }}
                </p>
                </div>
                <div>
                <p class="text-xs font-semibold text-gray-500 uppercase">Phone Number</p>
                <p class="mt-1 text-sm font-medium text-gray-800">
                    {{ memberInfo.phone }}
                </p>
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


export default {
  components: {

  },

  props: {
    member: {
      type: Object,
      default: () => ({})
    }
  },

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

  created() {
    this.showLoading = this.$showLoading
    // this.imageroot = this.userStore.loggedUser?.resourceURLRoot || ''

    // Init member data
     this.memberInfo = {
      name: 'Thusha',
      nic: '987456',
      registered: '2020/02/02',
      birthday: '1997/11/03',
      phone: '0715239845',
    }
  },

  mounted() {
    // optional: API calls / animations
  },

  methods: {
    toggleAccordion(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    }
  },

}
</script>
