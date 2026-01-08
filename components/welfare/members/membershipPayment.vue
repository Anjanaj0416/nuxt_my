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
        
          <span>{{ t('addMembersPaymentTital') }}</span>
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
                    @click="GoToAddNew"
                    type="button" 
                    class="text-white bg-brand hover:bg-brand-strong rounded-lg box-border bg-[#232B37] border border-transparent text-xs px-3 py-1.5 focus:outline-none"
                >
                  {{ t('addMembersPaymentAdd') }}
                </button>
            </div>
            <div
              v-if="welfareStore.listMemberShipPayment.length === 0"
              class="text-center text-gray-900 mt-5 text-sm font-medium"
            >
              <p>{{ t('noData') }}</p>
            </div>
            <div class="grid grid-cols-1 gap-6 mt-2
              max-h-[300px] md:max-h-[300px] lg:max-h-[300px]
              overflow-y-auto pr-2"
            >
              <div 
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-2"
                v-for="(list, index) in welfareStore.listMemberShipPayment"
              >
                  <div>
                    <p class="text-xs font-semibold text-gray-500 ">{{ t('fee') }}</p>
                    <p class="mt-1 text-sm font-sm text-gray-800">
                        {{ list.fee }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-gray-500 ">{{ t('collectionMonth') }}</p>
                    <p class="mt-1 text-sm font-sm text-gray-800">
                        {{ list.collectionMonth }}
                    </p>
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-gray-500 ">{{ t('paidDate') }}</p>
                    <p class="mt-1 text-sm font-sm text-gray-800">
                        {{ list.paidDate }}
                    </p>
                  </div>
                  <div>
                    <button
                      @click="removeData(list.id)"
                      type="button"
                      class="flex items-center gap-1 mt-3 text-white bg-red-500 hover:bg-red-600
                            rounded-lg text-xs px-3 py-1.5 focus:outline-none"
                    >
                      <!-- Trash Icon -->
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                                a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6
                                M1 7h22m-5-3H6a2 2 0 00-2 2v1h16V6
                                a2 2 0 00-2-2z"/>
                      </svg>
                    </button>
                  </div>

              </div>
            </div>
          <div>

          </div>
        </div>
      </transition>
      <addPayment v-if="isAddPayment" @close="isAddPayment = false" :memberId="id"/>
    </div>
  </div>
</template>
<script setup>
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()

  const { t } = useI18n()

  function switchLang(lang) {
    locale.value = lang
  }
</script>
<script>
import { useWelfareStore } from '~/stores/modules/welfare/welfareStore';
import { useUserStore } from '~/stores/modules/userStore';
import addPayment from '../payment/addPayment.vue';

export default {
  components: {addPayment},
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
      isAddPayment: false,

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
    },
    GoToAddNew() {
      this.isAddPayment = true;
    },

    removeData(paymentId) {
      this.$showConfirmWelfare(
        "Are you sure to Remove this payment?",
        "warning"
      ).then(async (result) => {
        if (result.isConfirmed) {

          await this.welfareStore.removePayment(paymentId,this.showLoading)
        }
      })
    },
  },

}
</script>



