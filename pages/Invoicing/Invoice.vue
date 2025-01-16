<template>
  <div>
    <section class="justify-center min-h-screen px-4 lg:px-80">
      <h1 class="mt-8 text-4xl font-semibold tracking-tight text-gray-700 text-balance sm:text-5xl">Invoice</h1>
      <div class="mt-10">
        <div class="relative p-8 mt-10 overflow-x-auto shadow-md sm:rounded-lg">
          <p class="text-xl font-semibold text-gray-600">Customer Details</p>
          <hr class="mt-2">
          <div class="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-3">
           <div>
              <label class="block mb-4 text-sm font-medium text-gray-500">Select Customer</label>
              <!--  <input
                type="text"
                v-model="email"
                placeholder="Enter User Name"
                required
                class="w-full p-2 mt-2 text-sm text-gray-700 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              /> -->
              <SearchInput
                  :arrItems="alCustomers"
                  ref="customerComp"
                  label=""
                  :err="err.customerId"
                  v-model="customerId"
                   @selectItem="LoadCustomerDetails"
                />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-6 rounded-lg sm:grid-cols-5">
            <!-- Customer Name -->
            <div class="p-2">
              <label class="block text-sm font-medium text-gray-500">Customer Name:</label>
              <p class="mt-1 text-lg font-semibold text-gray-800">xxxxx</p>
            </div>
            <!-- Address -->
            <div class="p-2">
              <label class="block text-sm font-medium text-gray-500">Address:</label>
              <p class="mt-1 text-lg font-semibold text-gray-800">xxxxx</p>
            </div>
            <!-- Email -->
            <div class="p-2">
              <label class="block text-sm font-medium text-gray-500">Email:</label>
              <p class="mt-1 text-lg font-semibold text-gray-800">xxxxxx</p>
            </div>
            <!-- Contact Number -->
            <div class="p-2">
              <label class="block text-sm font-medium text-gray-500">Contact Number:</label>
              <p class="mt-1 text-lg font-semibold text-gray-800">xxxxxx</p>
            </div>
            <!-- Web -->
            <div class="p-2">
              <label class="block text-sm font-medium text-gray-500">Web:</label>
              <p class="mt-1 text-lg font-semibold text-gray-800">xxxxxx</p>
            </div>
          </div>

          <p class="mt-10 text-xl font-semibold text-gray-600">Product Details</p>
          <hr class="mt-2">
          <!-- <div class="grid grid-cols-1 gap-4 mt-6 rounded-lg sm:grid-cols-4">
            <div>
              <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Package 1</h5>
                  </a>
                  <p class="block text-sm font-medium text-gray-500">Link : 100</p>
                  <p class="block text-sm font-medium text-gray-500">Period : 12Month</p>
                  <p class="block text-sm font-medium text-gray-500">Price : LKR: 5000.00</p>
                  <p class="block mb-6 text-sm font-medium text-gray-500">Other : Lorem ipsum dolor sit amet consectetur </p>

                  <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg btn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Add Package
                      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
              </div>
            </div>
            <div>
              <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Package 2</h5>
                  </a>
                  <p class="block text-sm font-medium text-gray-500">Link : 200</p>
                  <p class="block text-sm font-medium text-gray-500">Period : 6Month</p>
                  <p class="block text-sm font-medium text-gray-500">Price : LKR: 8000.00</p>
                  <p class="block mb-6 text-sm font-medium text-gray-500">Other : Lorem ipsum dolor sit amet consectetur </p>

                  <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-indigo-800 btn hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Add Package
                      <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                  </a>
              </div>
            </div>
          </div> -->
          
          <ul class="grid w-full gap-6 mt-10 md:grid-cols-5">
              <li>
                  <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required />
                  <label for="hosting-small" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                      <div class="block">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Package 1</h5>
                        </a>
                        <p class="block text-sm font-medium text-gray-500">Link : 200</p>
                        <p class="block text-sm font-medium text-gray-500">Period : 6Month</p>
                        <p class="block text-sm font-medium text-gray-500">Price : LKR: 8000.00</p>
                        <p class="block mb-6 text-sm font-medium text-gray-500">Other : Lorem ipsum dolor sit amet consectetur </p>
                        <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </div>
                  </label>
              </li>
              <li>
                  <input type="radio" id="hosting-big" name="hosting" value="hosting-big" class="hidden peer">
                  <label for="hosting-big" class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <div class="block">
                        <a href="#">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Package 2</h5>
                        </a>
                        <p class="block text-sm font-medium text-gray-500">Link : 200</p>
                        <p class="block text-sm font-medium text-gray-500">Period : 6Month</p>
                        <p class="block text-sm font-medium text-gray-500">Price : LKR: 8000.00</p>
                        <p class="block mb-6 text-sm font-medium text-gray-500">Other : Lorem ipsum dolor sit amet consectetur </p>
                        <svg class="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                      </div>
                  </label>
              </li>
          </ul>


          <!-- <p class="mt-10 text-xl font-semibold text-gray-600">Product Details</p> -->
          <hr class="mt-8 mb-10">
          <div class="relative overflow-x-auto sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Item
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Qty
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Discount
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Package 1
                      </th>
                      <td class="px-6 py-4">
                        LKR: 5000.00
                      </td>
                      <td class="px-6 py-4">
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Qty" required />
                      </td>
                      <td class="px-6 py-4">
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Discount" required />
                      </td>
                      <td class="px-6 py-4">
                        LKR : 5000.00
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Package 2
                      </th>
                      <td class="px-6 py-4">
                        LKR: 5000.00
                      </td>
                      <td class="px-6 py-4">
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Qty" required />
                      </td>
                      <td class="px-6 py-4">
                        <input type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Discount" required />
                      </td>
                      <td class="px-6 py-4">
                        LKR : 5000.00
                      </td>
                    </tr>
                </tbody>
            </table>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-6 rounded-lg sm:grid-cols-2 lg:grid-cols-3">
            <!-- Left Side (Empty Divs for Placement) -->
            <div></div>
            <div></div>
            <!-- Invoice Summary -->
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <p class="text-xl font-semibold text-gray-800 dark:text-gray-100">Invoice Summary</p>
              <div class="mt-4 space-y-2">
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Discount:</span>
                  <span>LKR 5000.00</span>
                </div>
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Net Price:</span>
                  <span>LKR 5000.00</span>
                </div>
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Tax (10%):</span>
                  <span>LKR 500.00</span>
                </div>
                <div class="flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <span>Total:</span>
                  <span>LKR 5500.00</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-6 rounded-lg sm:grid-cols-4">
            <div>
              <button type="button" class="w-full text-white hover:bg-indigo-800 btn focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-yellow-900">
                Draft
              </button>
            </div>
            <div>
              <button type="button" class="w-full text-white hover:bg-indigo-800 btn focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-yellow-900">
                Print Pdf
              </button>
            </div>
            <div>
              <button type="button" class="w-full text-white hover:bg-indigo-800 btn focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-yellow-900">
                Print Invoice
              </button>
            </div>
            <div>
              <button type="button" class="w-full text-white hover:bg-indigo-800 btn focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:focus:ring-yellow-900">
                Submit
              </button>
            </div>
          </div>





        </div>
      </div>
    </section>
  </div>
</template>

<script>
import headercomp from '~/components/header';
import footercomp from '~/components/footer';
import SearchInput from '~/components/customcontrol/SearchInput';


export default {
  components: { headercomp, footercomp,SearchInput },
  data() {
    return {
      isModalOpen: {
        view: false,
        delete: false,
        restore: false
      },
      alCustomers:[
            {id:'1',value:'abans ltd' },
            {id:'2',value:'damro' },
            {id:'3',value:'perera & sons' },
            {id:'4',value:'mervin hardware' },
            ],
            customerId:4,
            err:{
              categoryid:'',
            },
    };
  },
  methods: {
    LoadCustomerDetails(customerId){
        alert(customerId)
    },
    openModal(type) {
      this.isModalOpen[type] = true;
    },
    closeModal(type) {
      this.isModalOpen[type] = false;
    },
    deleteVendor() {
      this.closeModal('delete');
    },
    restoreVendor() {
      this.closeModal('restore');
    },
    goToProformaInvoice() {
      this.$router.push('/Invoicing/invoice');
    }
  }
};
</script>

<style scoped>
/* Define standardized font sizes */


/* .text-lg font-semibold text-gray-800 {
  @apply text-lg font-semibold text-gray-800;
} */

/* Add custom button styles */
.btn {
  background-color: #072556;
}
</style>
