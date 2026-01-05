<template>
  <section>
    <section class="px-4 py-8 mt-14 lg:px-24">
      

      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse mb-4">
          <li class="inline-flex items-center">
            <a href="#" class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
              <svg class="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
              {{ t('homepage') }}
            </a>
          </li>
          <li aria-current="page">
            <div class="flex items-center space-x-1.5">
              <svg class="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/></svg>
              <span class="inline-flex items-center text-sm font-medium text-body-subtle">{{ t('members') }}</span>
            </div>
          </li>
        </ol>
      </nav>

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
        <div class="my-4">        
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class=" p-5 sm:p-6">
              <div class="relative">
                <input
                  type="search"
                  v-model="keyWord"
                  :placeholder="t('searchPlaceholderMember')"
                  class="w-full rounded-full border border-gray-300 px-6 py-3 text-sm text-gray-800
                        focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <button
                  @click="searchMembers"
                  class="absolute right-2 top-1/2 -translate-y-1/2
                        bg-gray-600 hover:bg-gray-700
                        text-white px-6 py-2 rounded-full text-sm font-medium"
                >
                  {{ t('search') }}
                </button>
              </div>
              <div class="flex gap-2 mt-4 overflow-x-auto items-center whitespace-nowrap">
                <button
                  v-for="category in translatedCategories"
                  :key="category.id"
                  @click="toggleCategory(category)"
                  :class="[
                    'relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 border',
                    activeCategoryId === category.id
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-200'
                  ]"
                >
                  {{ category.value }}
                </button>
              </div>




            </div>
          </div>
        </div>
        <!-- {{ welfareStore.listMembers }} -->
        <div
          v-if="welfareStore.listMembers.length === 0"
          class="text-center text-gray-900 mt-5 text-sm font-medium"
        >
          <p>{{ t('noData') }}....</p>
        </div>
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()


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
      keyWord: '',
      activeCategoryId: 190,
      categories: [
        { id: 190, value: this.$t('all') },
        { id: 100, value: this.$t('BookId') },
        { id: 110, value: this.$t('Name') },
        { id: 120, value: this.$t('Mobile')},
        { id: 130, value: this.$t('Address') },
        { id: 140, value: this.$t('Nic')},
      ],
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

    // Get query params from route
    const { keyWord, category } = this.$route.query;
    this.activeCategoryId = category ?? 190;
    this.keyWord = keyWord || '';

    await this.welfareStore.fetchMember(
      {
        searchBy: this.activeCategoryId || "190", 
        keyWord: this.keyWord || "",
      },
      this.showLoading
    )
  },
  watch: {},
  computed: {
    translatedCategories() {
      return [
        { id: 190, value: this.$t('all') },
        { id: 100, value: this.$t('BookId') },
        { id: 110, value: this.$t('Name') },
        { id: 120, value: this.$t('Mobile') },
        { id: 130, value: this.$t('Address') },
        { id: 140, value: this.$t('Nic') },
      ]
    }
  },

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

    toggleCategory(category) {
      // If clicked the same button, deselect
      if (this.activeCategoryId === category.id) {
        this.activeCategoryId = null;
      } else {
        this.activeCategoryId = category.id;
      }
      console.log('Active Category ID:', this.activeCategoryId);
    },

    searchMembers() {
      this.welfareStore.fetchMember(
        {
          searchBy: this.activeCategoryId || "190", 
          keyWord: this.keyWord || "",
        },
        this.showLoading
      );
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