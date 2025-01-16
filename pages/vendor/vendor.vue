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
                        class="p-2.5 ms-2 text-sm font-medium text-white bg-btn rounded-lg border border-blue-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-red-300"
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
            <div class="flex flex-wrap items-center gap-4 mt-5">
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
    
            <div class="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 shadow-inner rtl:text-right dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Vendor Code
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Company Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Contact Number
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" class="px-6 py-3">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                v123
                            </th>
                            <td class="px-6 py-4">
                                Digital Lab
                            </td>
                            <td class="px-6 py-4">
                                digital@gmail.com
                            </td>
                            <td class="px-6 py-4">
                                0112345678
                            </td>
                            <td class="px-6 py-4">
                                <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                    Active
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <button
                                    @click="openModal('view')"
                                    class="px-4 py-2 mr-2 font-semibold text-gray-700 transition duration-300 ease-in-out border-2 border-blue-800 rounded-lg hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    aria-label="View a vendor"
                                >
                                    View 
                                </button>
                                <button
                                    @click="openModal('delete')"
                                    class="px-4 py-2 mr-2 font-semibold text-gray-700 transition duration-300 ease-in-out border-2 border-blue-800 rounded-lg hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    aria-label="Delete a vendor"
                                >
                                    Delete 
                                </button>
                                <button
                                    @click="openModal('restore')"
                                    class="px-4 py-2 font-semibold text-gray-700 transition duration-300 ease-in-out border-2 border-blue-800 rounded-lg hover:bg-blue-900 hover:text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                                    aria-label="Restore a vendor"
                                >
                                    Restore 
                                </button>
                            </td>

                            <!-- Add Modal -->
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
                                            <addvender />
                                        </div>
                                    </div>
                                </div>
                            </div>  

                            <!-- View Modal -->

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
                                            <homeviewvender />
                                        </div>
                                    </div>
                                </div>
                            </div>

            
                            <!-- Delete Modal -->
                            <div v-if="isModalOpen.delete"tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                                <div class="relative w-full max-w-2xl p-4 mx-auto md:p-6">
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <button type="button" @click="closeModal('delete')" class="absolute inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg top-3 right-3 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                        </button>
                                        <div class="p-4 text-center md:p-5">
                                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this vendor?</h3>
                                            <button @click="deleteVendor" type="button" class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">Yes, I'm sure</button>
                                            <button @click="closeModal('delete')" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">No, cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
            
                            <!-- Restore Modal -->
                            <div v-if="isModalOpen.restore" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 items-center justify-center w-full h-full overflow-y-auto">
                                <div class="absolute relative w-full max-w-md p-4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <button type="button" @click="closeModal('restore')" class="absolute inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg top-3 right-3 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                            </svg>
                                        </button>
                                        <div class="p-4 text-center md:p-5">
                                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to restore this vendor?</h3>
                                            <button @click="restoreVendor" type="button" class="text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">Yes, I'm sure</button>
                                            <button @click="closeModal('restore')" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">No, cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tr>
                    </tbody>
                </table>
            </div>
          
      </section>
    </div>
  </template>
  
  
  <script>
  import headercomp from '~/components/header';
  import footercomp from '~/components/footer';
  import homeviewvender from '~/pages/vendor/homeviewvendor.vue'
  import addvender from '~/pages/vendor/addvender.vue'

  
  
  
  export default {
    components: { headercomp, footercomp, homeviewvender, addvender },
    data() {
      return {
        isModalOpen: {
          view: false,
          delete: false,
          restore: false
        }
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
      }
    }
  };
  </script>
  
  <style scoped>
  .btn {
    background-color: #072556;
  }
  </style>
  