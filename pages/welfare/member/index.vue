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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg 
            bg-gradient-to-r from-gray-700 via-gray-800 to-black flex items-center justify-between">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <h2 class="text-sm font-medium opacity-90 mr-4">{{ t('AddMembersbtn') }}:</h2>
            <p class="text-2xl font-bold mr-4">120</p>
            <p class="text-sm opacity-80 mt-1">{{ t('activeM') }}: 110 | {{ t('inactiveM') }}: 10</p>
          </div>
        </div>

        <div class=" mt-2">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <div class="grid grid-cols-1 gap-4">
              <div 
                v-for="(member, index) in members"
                :key="index" 
                class="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white shadow-lg hover:shadow-xl transition-all"
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
                    <span class="text-xs font-semibold text-gray-300">{{ t('name') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.name }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-300">{{ t('id') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.id }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-300">{{ t('joinDate') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.joinDate }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-300">{{ t('phone') }}</span>
                    <span class="text-sm font-bold truncate">{{ member.phone }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-xs font-semibold text-gray-300">{{ t('status') }}</span>
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
                          : 'text-white border-transparent hover:text-gray-600 hover:border-gray-300'
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
                    class="col-span-7 p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white rounded-b-xl mt-2"
                  >
                    <h1>details</h1>
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

definePageMeta({
  layout: 'society'
});
export default {

  components: {addMember},
  props: [''],
  data() {
    return {
      isAddLeads: false,
      imageroot: process.env.Assets_83,
      activeTab: { type: null, memberId: null }, 
      members: [
        {
          id: "M001",
          name: "John Doe",
          isActive: true,
          joinDate: "2025-01-15",
          phone: "+94 77 123 4567",
          email: "john.doe@example.com",
          pendingPayments: 2,
          upcomingEvents: ["Welfare Meetup", "Annual Gathering"],
          image: "https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"
        },
        {
          id: "M002",
          name: "Jane Smith",
          isActive: false,
          joinDate: "2024-11-20",
          phone: "+94 77 987 6543",
          email: "jane.smith@example.com",
          pendingPayments: 0,
          upcomingEvents: [],
        },
        {
          id: "M003",
          name: "Michael Perera",
          isActive: true,
          joinDate: "2025-03-10",
          phone: "+94 71 234 5678",
          email: "michael.perera@example.com",
          pendingPayments: 1,
          upcomingEvents: ["Community Support Event"],
        },
      ],

    }
  },
  async mounted() { },
  watch: {},
  computed: {
    // ...mapState({
    //   //loggeduser: (state) => state.loggeduser,
    // }),
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