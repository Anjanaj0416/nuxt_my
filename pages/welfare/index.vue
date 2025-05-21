<template>
    <div>
      <section class="justify-center min-h-screen px-4 lg:px-80">
        <h1 class="mt-8 text-4xl font-semibold tracking-tight text-gray-700 text-balance sm:text-5xl">Member Details</h1>
        <div class="flex flex-col items-center justify-between mt-10 md:flex-row">
          <div class="w-full md:w-auto">
            <form class="flex items-center justify-center max-w-sm mx-auto" @submit.prevent="handleSearch">
              <div class="relative w-full">
                <div class="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  v-model="searchQuery"
                  class="border border-btn text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm block w-full ps-10 p-2.5"
                  placeholder="Search Products..."
                  required
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-white bg-btn rounded-lg border border-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                Search
              </button>
            </form>
          </div>
        </div>
  
        <div class="flex flex-wrap gap-4 p-4 mt-10 mb-2 ">
          <!-- Left Section: Fields -->
          <div class="grid flex-1 grid-cols-2 gap-y-4">
            <div v-for="(item, index) in filteredBankData" :key="'bank-' + index">
              <label class="text-base font-semibold text-gray-600">{{ item.label }} :</label>
              <p class="text-sm text-gray-500">{{ item.value }}</p>
            </div>
          </div>
  
          <div class="w-auto h-auto bg-gray-100 rounded-lg shadow-md sm:w-1/3">
            <div class="grid grid-cols-2 p-5 text-center gap-y-4">
              <div>
                <h1 class="text-lg font-semibold text-gray-700">Book No</h1>
                <span class="text-5xl font-bold text-gray-500">15</span>

              </div>
              <div>
                <h1 class="text-lg font-semibold text-gray-700">User</h1>
                <img
                  src="/./assets/img/Logo.png"
                  alt="AWS Logo"
                  class="w-20 mx-auto"
                />
              </div>
            </div>
            <div class="flex items-center justify-center p-4 bg-gray-200 rounded-b-lg">
              <h1 class="text-2xl font-semibold text-gray-700">072 7052035</h1>
            </div>
          </div>
        </div>

        <div class="grid gap-4 p-4 mt-0 mb-0">
            <!-- Personal Information Header -->
            <h2 class="mt-10 text-lg font-semibold text-gray-700">Dependent Details</h2>
            <hr>
            <div class="w-full mb-2 md:mb-0">
                <button
                class="px-4 py-2 font-semibold text-black transition duration-300 ease-in-out border-2 rounded-lg border-btn hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                aria-label="Add a new vendor"
                >
                New
                </button>
            </div>
            <!-- Display Bank Information -->
            <div class="grid flex-1 grid-cols-3 mt-3 gap-y-2">
                <div v-for="(item, index) in filteredDepartmentDataData" :key="'departmentData-' + index">
                  <div class="relative w-full max-w-sm px-4 pt-1 pb-2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div v-if="item.showDependent" class="absolute px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-r-lg shadow-md -left-2 top-4">
                      Dependent
                    </div>
                    <div class="flex justify-end px-4 pt-4">
                      <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                        Edit
                      </button>
                    </div>
                    
                    <div class="flex flex-col items-center pb-10">
                      <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="/./assets/img/Logo.png" alt="image" />
                      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ item.label }}</h5>
                      <p class="text-sm text-gray-700">Phone: <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.phone }}</span></p>
                      <p class="text-sm text-gray-700">Nic: <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.NIC }}</span></p>
                      <p class="text-sm text-gray-700">Register Date: <span class="text-sm text-gray-500 dark:text-gray-400">{{ item.Reg }}</span></p>
                    </div>
                  </div>


                </div>
            </div>
        </div>

        <div class="grid gap-4 p-4 mt-0 mb-4">
            <!-- Personal Information Header -->
            <h2 class="mt-10 text-lg font-semibold text-gray-700">Membership contact fee</h2>
            <hr>
            <div class="flex flex-col items-center justify-between mt-10 md:flex-row">
                <div class="w-full mb-4 md:mb-0"></div>
                <div class="flex justify-end w-full md:w-auto">
                    <form class="flex items-center max-w-sm mx-auto">
                        <div class="relative flex space-x-2">
                            <input
                                type="text"
                                id="simple-search-1"
                                class="border border-btn text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm block w-full ps-10 p-2.5"
                                placeholder="From : "
                                required
                            />
                            <input
                                type="text"
                                id="simple-search-2"
                                class="border border-btn text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm block w-full ps-10 p-2.5"
                                placeholder="To :"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            class="p-2.5 ms-2 text-sm font-medium text-white bg-btn rounded-lg border border-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>



            <!-- Display Bank Information -->
            <div class="grid flex-1 grid-cols-3 mt-3 border-gray-800 rounded-lg shadow-sm gap-y-4">
              <div class="border border-gray-200 rounded-lg shadow-sm">
                <div class="grid grid-cols-1 p-5 text-center gap-y-4">
                  <div>
         
                    <span class="text-4xl font-bold text-gray-500">2025</span>
                  </div>
                  <div>
                    <h1 class="text-lg font-semibold text-gray-700">February</h1>
   
                  </div>
                </div>
                <div class="flex items-center justify-center p-4 bg-gray-200 rounded-b-lg">
                  <h1 class="text-2xl font-semibold text-gray-700">LKR: 5000.00</h1>
                </div>
              </div>
            </div>

        </div>

  <div class="mt-20"> </div>
        
      </section>
    </div>
  </template>
  
  <script>
  import headercomp from '~/components/header';
  import footercomp from '~/components/footer';
 // import viewInvoice from '~/pages/Invoicing/viewInvoice.vue'
  
  export default {
    components: { headercomp, footercomp },
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
    computed: {
      filteredBankData() {
        return this.bankData.filter(item =>
          item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      filteredPersonalData() {
        return this.personalData.filter(item =>
          item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      filteredDepartmentDataData() {
        return this.departmentData.filter(item =>
          item.label.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      handleSearch() {
        // You can further handle the search action if needed.
        console.log('Searching for:', this.searchQuery);
      }
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
  