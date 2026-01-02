<template>
  <section>
    <section class="px-4 py-8 mt-14 lg:px-24">
      <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
          <div class="text-2xl uppercase">   {{ t('members') }} </div>
            <div class="w-full md:w-auto">
              <div class="mr-2">
                <router-link
                  @click="GoToAddNew"
                  to="/welfare/member"
                  class="relative flex items-center gap-2 px-4 py-2 bg-[#232B37]
                        text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 
                        transition-all duration-300 ease-in-out"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" 
                      fill="none" viewBox="0 0 24 24" stroke-width="2" 
                      stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  <span class="text-sm sm:text-sm font-semibold tracking-wide">
                      {{ t('AddMembersbtn') }}
                  </span>
                </router-link>
              </div>
            </div>
          </div>
        <!-- Add Members Button -->
       
        <!-- Details Cards -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg 
            bg-gradient-to-r from-gray-700 via-gray-800 to-black flex items-center justify-between">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <h2 class="text-sm font-medium opacity-90 mr-4">{{ t('AddMembersbtn') }}:</h2>
            <p class="text-2xl font-bold mr-4">120</p>
            <p class="text-sm opacity-80 mt-1">{{ t('activeM') }}: 110 | {{ t('inactiveM') }}: 10</p>
          </div>
        </div> -->
        <div class="my-4">
              
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class=" p-5 sm:p-6">
          <div class="relative">
            <input
         
              type="search"
              placeholder="Search member name, mobile, address, nic..."
              class="w-full rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-800
                     focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
         
              class="absolute right-2 top-1/2 -translate-y-1/2
                     bg-gray-600 hover:bg-gray-700
                     text-white px-6 py-2 rounded-full text-sm font-medium"
            >
              Search
            </button>
          </div>
 

        </div>
      </div>
    
        </div>

        <!-- {{ welfareStore.listMembers }} -->

        <div class=" mt-2">
          <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            <div class="grid grid-cols-1 gap-4">
              <div 
                v-for="(member, index) in welfareStore.listMembers"
                :key="index" 
                class="relative overflow-hidden border-2 rounded-2xl p-6 text-gray-500 shadow-lg hover:shadow-xl transition-all"
              >
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div class="flex justify-center items-center">
                    <ImageLable 
                      v-if="member.image" 
                      :imageUrl="member.image" 
                      alt="Member Avatar" 
                      class="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-600">{{ t('name') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.name || "-"}}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-600">{{ t('id') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.registartionNo  || "-"}}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-600">{{ t('address') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.address || "-"}}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-600">{{ t('phone') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.contactNo || "-"}}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-600">{{ t('status') }}</span>
                    <span 
                      :class="{
                        'bg-green-100 text-green-800 px-2 py-0.5 rounded-full': member.isActive,
                        'bg-red-100 text-red-800 px-2 py-0.5 rounded-full': !member.isActive
                      }"
                      class="text-sm"
                    >
                      {{ member.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>

                <div class="sm:flex sm:justify-end sm:gap-4 mt-2">
                  <div class="grid grid-cols-3 gap-2 sm:flex sm:gap-4 text-sm font-medium text-gray-500">
                    <button
                      @click="toggleTab('details', member.id)"
                      :class="[
                        'p-2 border-b-2 rounded-t-lg text-center',
                        activeTab.type === 'details' && activeTab.memberId === member.id
                          ? 'text-red-600 border-transparent'
                          : 'text-gray-600 border-transparent hover:text-gray-600 hover:border-gray-300'
                      ]"
                    >
                      <!-- {{ activeTab.type === 'details' && activeTab.memberId === member.id ? 'Close Details' : 'Details' }} -->
                        {{ activeTab.type === 'details' && activeTab.memberId === member.id ? t('closeDetails') : t('details') }}

                    </button>
                  </div>
                </div>

                <!-- Tab Contents -->
                <div class="p-0 dark:border-gray-700">
                  <div 
                    v-if="activeTab.type === 'details' && activeTab.memberId === member.id" 
                    class="col-span-7 p-4 text-gray500 rounded-b-xl mt-2"
                  >
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      <div>
                        <memberDetails :id="member.id"/>
                      </div>
                      <div>
                        <dependentsDetails :id="member.id"/>
                      </div>
                      <div>
                        <deathDetails :id="member.id"/>
                      </div>
                      <div>
                        <membershipPayment :id="member.id"/>
                      </div>
                      <div>
                        <attendance :id="member.id"/>
                      </div>
                      <div>
                        <fund/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <addMember v-if="isAddLeads" @close="isAddLeads = false" />
  </section>
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
import addMember from './addMember.vue';
import memberDetails from '~/components/welfare/members/memberDetails.vue';
import dependentsDetails from '~/components/welfare/members/dependentsDetails.vue';
import deathDetails from '~/components/welfare/members/deathDetails.vue';
import membershipPayment from '~/components/welfare/members/membershipPayment.vue';
import attendance from '~/components/welfare/members/attendance.vue';
import fund from '~/components/welfare/members/fund.vue';
import { useUserStore } from '~/stores/modules/userStore';
import { useWelfareStore } from '~/stores/modules/welfare/welfareStore';

definePageMeta({
  layout: 'society',
  middleware: 'auth',

});
export default {

  components: {addMember,memberDetails,dependentsDetails,deathDetails,membershipPayment,attendance,fund},
  props: [''],
  data() {
    return {
      isAddLeads: false,
      imageroot: process.env.Assets_83,
      activeTab: { type: null, memberId: null }, 
      data:{
        bookId: "",
        name: "",
        mobile: "",
        address: "",
        nic: "",
      },
    }
  },
  async mounted() { },
  async created() {
    this.userStore = useUserStore();
    this.welfareStore = useWelfareStore();
    this.showLoading = this.$showLoading;
    this.imageroot = this.userStore.loggedUser.resourceURLRoot;
    await this.welfareStore.fetchMember(
      {
        bookId: this.bookId || "", 
        name: this.name || "",
        mobile: this.mobile || "",
        address: this.address || "",
        nic: this.nic || "",
      },
      this.showLoading
    )
  },
  watch: {},
  computed: {},
  methods: {

    GoToAddNew() {
      this.isAddLeads = true;
    },

    toggleTab(type, id) {
      if (this.activeTab.type === type && this.activeTab.memberId === id) {
        this.activeTab = { type: null, memberId: null } // close if same tab clicked
      } else {
        this.activeTab = { type, memberId: id } // open selected tab
      }
    },




  },
  async beforeMount() {
    // if (this.loggeduser.granted.indexOf('workgroup') > -1 || this.loggeduser.usergroup == 'Supervisor' ) {
    // } else {
    //   this.show_error('Not Allowed to access this page')
    //   this.$router.push('/')
    // }

  },
  head() {
    return {
      title: 'Intranet - Digital Tech Labs',
    }
  },
}


</script>

<style scoped>
.csscmd {
  @apply p-2 text-center bg-blue-200 rounded;
}

.csscmd:hover {
  @apply bg-blue-200 cursor-pointer;
}

.cssBox {
  border: 1px solid;
  @apply border-gray-500 rounded p-2;
}
</style>