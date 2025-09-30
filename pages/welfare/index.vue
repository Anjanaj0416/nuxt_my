<template>
    <div class="m-4 mt-20 lg:m-12 lg:mt-20">
      <section class="px-4 py-8 mt-14 lg:px-24">
        <!-- Add Members Button -->
        <div class="flex flex-row-reverse p-2">
          <router-link
            to="/welfare/member"
            class="relative flex items-center gap-2 px-4 py-2 bg-[#232B37]
                  text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 
                  transition-all duration-300 ease-in-out"
          >
            <!-- Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" stroke-width="2" 
                stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

            <!-- Text -->
            <span class="text-sm sm:text-base font-semibold tracking-wide">
              Add Members
            </span>
          </router-link>
        </div>

        <!-- Dashboard Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <!-- Total Members -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg 
            bg-gradient-to-r from-gray-700 via-gray-800 to-black">
            <!-- Decorative circle -->
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>

            <!-- Content -->
            <h2 class="text-sm font-medium opacity-90">Total Members</h2>
            <p class="text-3xl font-bold mt-2">120</p>
            <p class="text-sm opacity-80 mt-1">Active: 110 | Inactive: 10</p>
          </div>


          <!-- Pending Payments -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-black shadow-lg 
            bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
            <div class="absolute -top-8 -right-8 w-24 h-24 bg-black opacity-10 rounded-full"></div>
            <h2 class="text-sm font-medium text-gray-600">Pending Payments</h2>
            <p class="text-3xl font-bold mt-2">15</p>
            <p class="text-sm text-gray-700 mt-1">Due this month</p>
          </div>


          <!-- Upcoming Events -->
          <div class="relative overflow-hidden rounded-2xl p-6 text-white shadow-lg 
            bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700">
            <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <h2 class="text-sm font-medium opacity-90">Upcoming Events</h2>
            <p class="text-3xl font-bold mt-2">3</p>
            <p class="text-sm opacity-80 mt-1">Next: Welfare Meetup</p>
          </div>

        </div>
      </section>

     
    </div>
  </template>
  
  <script>
 // import headercomp from '~/components/header';
 // import footercomp from '~/components/footer';
 // import viewInvoice from '~/pages/Invoicing/viewInvoice.vue'
import { useUserStore } from '~/stores/modules/userStore';

 definePageMeta({
  layout: "society",
  middleware: "",
});
  
  export default {
    components: {  },//headercomp, footercomp
    data() {
      return {
        searchQuery: '',
        bankData: [
          { label: 'Bank Name', value: 'ABC Bank' },
          { label: 'Bank Branch', value: 'Kottawa' },
          { label: 'Bank Branch Code', value: 'ABC12345' },
          { label: 'Bank Account No', value: '58741269' },
          { label: 'Bank Swift Code', value: 'ABC12345' },
          { label: 'Sales officer No', value: 'rso21' }
        ],
        personalData: [
          { label: 'Contact Person Name', value: 'Perera' },
          { label: 'Contact Person Mobile', value: '074158769' },
          { label: 'Owner First Name', value: 'Nimal' },
          { label: 'Owner Contact', value: '072587459' },
          { label: 'Owner Birth Date', value: '1988.05.28' }
        ],
        departmentData: [
          { label: 'Nimal', phone: '074 845267', NIC: '9874525477', Reg: '25/01/025',showDependent: true   },
          { label: 'Rusiru', phone: '074 845267', NIC: '9874525477', Reg: '25/01/025',showDependent: false    },
          { label: 'Kaml', phone: '074 845267', NIC: '9874525477', Reg: '25/01/025',showDependent: false    },

        ],
      };
    },
     async created() {
    try {
      this.userStore = useUserStore();
    }
    catch { }
  },
    computed: {
      // filteredBankData() {
      //   return this.bankData.filter(item =>
      //     item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //     item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
      //   );
      // },
      // filteredPersonalData() {
      //   return this.personalData.filter(item =>
      //     item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //     item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
      //   );
      // },
      // filteredDepartmentDataData() {
      //   return this.departmentData.filter(item =>
      //     item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      //     item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
      //   );
      // }
    },
    methods: {
      // handleSearch() {
      //   // You can further handle the search action if needed.
      //   console.log('Searching for:', this.searchQuery);
      // }
    }
  };
  </script>
  
  <style scoped>
  .btn {
    background-color: #072556;
  }
  /* common */
.ribbon {

 
  
}

.ribbon span {
  position: absolute;
  display: block;
  width: 225px;
  padding: 15px 0;
  background-color: #3498db;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font: 700 18px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
}

/* top left*/
.ribbon-top-left {
  top: -10px;
  left: -10px;
}
.ribbon-top-left::before,
.ribbon-top-left::after {
  border-top-color: transparent;
  border-left-color: transparent;
}
.ribbon-top-left::before {
  top: 0;
  right: 0;
}
.ribbon-top-left::after {
  bottom: 0;
  left: 0;
}
.ribbon-top-left span {
  right: -25px;
  top: 30px;
  transform: rotate(-45deg);
}

/* top right*/
.ribbon-top-right {
  top: -10px;
  right: -10px;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 0;
}
.ribbon-top-right::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-right span {
  left: -25px;
  top: 30px;
  transform: rotate(45deg);
}




  </style>
  