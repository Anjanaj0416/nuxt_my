<template>
    <div>
      <section class="justify-center min-h-screen px-4 lg:px-80">
          <h1 class="mt-8 text-4xl font-semibold tracking-tight text-gray-700 text-balance sm:text-5xl">Vendor</h1>
            <div class='flex flex-col items-center justify-between mt-10 md:flex-row'>
                <div class="w-full mb-4 md:mb-0">
                    <button
                    @click="openModal('add')"
                    class="px-4 py-2 font-semibold transition duration-300 ease-in-out border-2 rounded-lg text-btn border-btn hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    aria-label="Add a new vendor"
                    >
                    Add Vender
                    </button>
                </div>
                <div class="w-full md:w-auto">
                    <form class="flex items-center justify-center max-w-sm mx-auto">
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
                                class="border border-btn text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent sm:text-sm block w-full ps-10 p-2.5"
                                placeholder="Search Products..."
                                required
                            />
                        </div>
                        <button
                        type="submit"
                        class="p-2.5 ms-2 text-sm font-medium text-white bg-btn rounded-lg border border-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none "
                        >
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
                        <span class="sr-only">Search</span>
                        </button>
                    </form>
                </div>
            </div>
            <div class="flex flex-wrap items-center gap-4 mt-6">
                <div class="flex items-center space-x-2">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <Label htmlFor="all" class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                        All
                    </Label>
                </div>
                <div class="flex items-center space-x-2">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <Label htmlFor="pending" class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                        Pending
                    </Label>
                </div>
                <div class="flex items-center space-x-2">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <Label htmlFor="active" class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                        Active
                    </Label>
                </div>
                <div class="flex items-center space-x-2">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <Label htmlFor="approved" class="text-sm font-medium text-gray-900 ms-2 dark:text-gray-300">
                        Approved
                    </Label>
                </div>
            </div>
    
            <div class="flex flex-col gap-5 p-2 mt-6 bg-white border-2 rounded-md shadow-md sm:p-6">
                <div class="flex flex-col justify-between sm:flex-row">
                    <div
                        v-for="(section, index) in vendor"
                        :key="index"
                        class="relative flex flex-col items-center text-center sm:items-start sm:text-left"
                    >

                        <h1 class="text-base font-semibold text-gray-700">{{ section.title }}</h1>
                        <p class="text-sm text-gray-500">{{ section.value }}</p>

                        <!-- Conditional vertical separator -->
                        <template v-if="index < vendor.length - 1">
                            <div class="w-full h-px mt-2 mb-2 bg-gray-300 sm:hidden"></div>
                            <div class="hidden sm:block absolute top-0 right-[-1rem] h-full w-px bg-gray-300"></div>
                        </template>
                    </div>
                </div>

                <!-- Button Group -->
                <div class="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:justify-end ">
                    <button
                        v-for="(button, index) in buttonSet"
                        :key="index"
                        @click="openModal(button.modalType)"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-2 border-blue-900 rounded-md hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                    >
                        {{ button.label }}
                    </button>

                    <!-- Add vendor -->
                    <div  v-if="isModalOpen.add" tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <div class="relative w-full max-w-4xl p-4 mx-auto md:p-6">
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
                                <button type="button" @click="closeModal('add')" class="absolute inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg top-3 right-3 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                                <!-- Modal content -->
                                <div class="p-6 sm:p-8">
                                    <addVender :modalType="'add'" @cancel-assign="closeModal('add')"/>
                                </div>
                            </div>
                        </div>
                    </div>  

                    <!-- View vendor -->
                    <div  v-if="isModalOpen.view" tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <div class="relative w-full max-w-4xl p-4 mx-auto md:p-6">
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 max-h-[90vh] overflow-y-auto">
                                <button type="button" @click="closeModal('view')"  class="absolute inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg top-3 right-3 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                                <!-- Modal content -->
                                <div class="p-6 sm:p-8">
                                    <viewVendor :modalType="'view'" @cancel-view="closeModal('view')"  />
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- upload Approval Vendor -->
                    <div v-if="isModalOpen.assign" tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <div class="relative w-full max-w-2xl p-4 mx-auto md:p-6">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" @click="closeModal('assign')" class="absolute inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg top-3 right-3 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                            <div class="p-4 md:p-5">
                                <AssignRso :modalType="'assign'" @cancel-assign="closeModal('assign')" />
                            </div>
                            </div>
                        </div>
                    </div>
    
                    <!-- Delete Modal -->
                    <div v-if="isModalOpen.delete"tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                        <div class="relative w-full max-w-2xl p-4 mx-auto md:p-6">
                            <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                                <!-- Close Button -->
                                <button
                                    type="button"
                                    @click="closeModal('delete')"
                                    class="absolute inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 transition duration-300 bg-transparent rounded-lg top-3 right-3 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                                <!-- Modal Content -->
                                <div class="p-6 text-center">
                                    <h3 class="mb-6 text-xl font-medium text-gray-700 dark:text-gray-400">Are you sure you want to delete this vendor?</h3>
                                    <div class="flex justify-center space-x-4">
                                        <!-- Confirm Button -->
                                        <button
                                            @click="deleteVendor"
                                            type="button"
                                            class="inline-flex items-center px-6 py-3 text-sm font-medium text-white transition duration-300 bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
                                        >
                                            Yes, I'm sure
                                        </button>
                                        <!-- Cancel Button -->
                                        <button
                                            @click="closeModal('delete')"
                                            type="button"
                                            class="py-2.5 px-6 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 transition duration-300"
                                        >
                                            No, cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-center mt-10">
                <nav aria-label="Page navigation example">
                    <ul class="flex items-center h-10 -space-x-px text-base">
                        <li>
                        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Previous</span>
                            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                        <a href="#" aria-current="page" class="z-10 flex items-center justify-center h-10 px-4 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                        <a href="#" class="flex items-center justify-center h-10 px-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span class="sr-only">Next</span>
                            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
      </section>
    </div>
  </template>
  
  
  <script>
  import headercomp from '~/components/header';
  import footercomp from '~/components/footer';
  import viewVendor from './viewVendor.vue';
  import addVender from './vender.vue';
  import AssignRso from './assignRso.vue';

  
  
  
  export default {
    components: { headercomp, footercomp, viewVendor, addVender, AssignRso },
    data() {
      return {
        isModalOpen: {
          view: false,
          delete: false,
          restore: false
        },
        vendor: [
            { title: "Customer Ref", value: "AE51156" },
            { title: "Name", value: "Abans Group of Company" },
            { title: "Contact", value: "Silva - 0718542367" },
            { title: "Business Type", value: "Hardware" },
            { title: "RSO", value: "Saman - 071458752" },
            { title: "Status", value: "Active" },  
        ],
        buttonSet: [
            { label: "View more", modalType: "view" },
            { label: "Assign RSO", modalType: "assign" },
            { label: "Quotations", modalType: "quotations" },
            { label: "Delete", modalType: "delete" }
        ]
      };
    },
    methods: {
      openModal(type) {
        this.isModalOpen[type] = true;
      },
      closeModal(type) {
        this.isModalOpen[type] = false;
      },
      deleteVendor() {
        // Logic for deleting the vendor
        this.closeModal('delete');
      },
      restoreVendor() {
        // Logic for restoring the vendor
        this.closeModal('restore');
      },

    }
  };
  </script>
  
<style scoped>
/* Optional: Add custom styles for the layout */
.sm\:text-left {
  text-align: left;
}

@media (min-width: 640px) {
  .sm\:block {
    display: block;
  }

  .sm\:hidden {
    display: none;
  }
}
</style>
  