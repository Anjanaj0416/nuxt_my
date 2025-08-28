<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Pay Now</h2>
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content -->
      <div class="p-6 overflow-y-auto flex flex-col">
        <div class="flex flex-col gap-6">

          <!-- {{ posStore.listClients }} -->
        <template v-if="!paymentSuccess">

          <!-- Customer Selection -->
          <div class="space-y-2">
            <label class="font-bold text-gray-800 text-lg">Select Customer</label>
            <select
              v-model="selectedClientId"
              @change="onClientSelect"
              class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="" disabled>Select a client</option>
              <option v-for="client in posStore.listClients" :key="client.id" :value="client.id">
                {{ client.name }}
              </option>



            </select>
            <p v-if="errors.client" class="text-red-500 text-sm">{{ errors.client }}</p>

            <div
              v-if="selectedClient"
              class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-xl shadow-inner mt-2"
            >
              <p><span class="font-semibold">Name:</span> {{ selectedClient.name }}</p>
              <p><span class="font-semibold">Address:</span> {{ selectedClient.address }}</p>
              <p class="sm:col-span-2"><span class="font-semibold">Phone:</span> {{ selectedClient.contactNo }}</p>
            </div>
          </div>

          <!-- Invoice & Reference -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="flex flex-col">
              <label class="font-bold text-gray-800">Invoice Template Code</label>
              <input
                type="number"
                v-model="InvoiceTemplateCode"
                placeholder="Enter invoice code"
                class="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <p v-if="errors.InvoiceTemplateCode" class="text-red-500 text-sm">{{ errors.InvoiceTemplateCode }}</p>
            </div>
            <div class="flex flex-col">
              <label class="font-bold text-gray-800">Pay Reference</label>
              <input
                type="number"
                v-model="payReference"
                placeholder="Enter reference"
                class="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <p v-if="errors.payReference" class="text-red-500 text-sm">{{ errors.payReference }}</p>
            </div>
          </div>

          <!-- Discounts & Total -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-xl shadow-md flex justify-between items-center">
              <span class="font-semibold">Whole Discount:</span>
              <span class="font-bold text-green-800">Rs. {{ Number(subDiscount).toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-xl shadow-md flex justify-between items-center">
              <span class="font-semibold">Total:</span>
              <span class="font-bold text-blue-800">Rs. {{ Number(grandTotal).toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}</span>
            </div>
          </div>

          <!-- Cash Received -->
          <div class="flex flex-col">
            <label class="font-bold text-gray-800">Enter Cash Received</label>
            <input
              type="number"
              v-model.number="cashReceived"
              placeholder="Enter amount"
              class="mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            <!-- <p v-if="errors.cashReceived" class="text-red-500 text-sm">{{ errors.cashReceived }}</p> -->
          </div>

          <!-- Remaining Balance -->
          <div class="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl shadow-inner flex justify-between font-semibold">
            <span>Remaining Balance:</span>
            <span :class="{'text-red-600 font-bold': remainingBalance < 0, 'text-green-700 font-bold': remainingBalance >= 0}">
              Rs. {{ remainingBalance.toLocaleString('en-LK', { minimumFractionDigits: 2 }) }}
            </span>
          </div>
          <p v-if="remainingBalance < 0" class="text-red-600 font-medium text-sm">
            Cash received is less than total!
          </p>

          <!-- Submit Button -->
         <button
            @click="submitPayment"
            class="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg transition transform "
          >
            Make Payment
          </button>

        </template>
        <template v-else>
          <div class="text-center py-10 px-6">
            <!-- Success Message -->
            <p class="text-green-700 text-2xl font-extrabold mb-6">
              Payment Successful!
            </p>

            <!-- Description / Optional -->
            <p class="text-gray-600 mb-8">
              You can print the bill, send it via WhatsApp, or download the PDF.
            </p>

            <!-- Button Group -->
            <div class="flex flex-col md:flex-row justify-center gap-4">
              <!-- Thermal Print -->
              <button
                @click="handleThermalPrint"
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform "
              >
                🖨️ Thermal Print
              </button>

              <!-- WhatsApp -->
              <button
                @click="handleWhatsAppSend"
                :disabled="true"
                class="flex-1 bg-green-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition
                      disabled:opacity-50 disabled:cursor-not-allowed"
              >
                💬 WhatsApp
              </button>


              <!-- PDF -->
              <button
                @click="handlePDFDownload"
                class="flex-1 bg-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition
                      disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📄 PDF
              </button>
            </div>
          </div>
        </template>

        </div>
      </div>

      


      <!-- Modal Footer -->
      <!-- <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Cancel</button>
        <button @click="submitPayment" class="confirm-button">Submit Payment</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useposStore } from "~/stores/modules/pos/posStore";
import closebtn from "~/components/customcontrol/modal_close_button";

export default {
  components: { closebtn },
  props: {
    cart: Array,
    subDiscount: { type: Number, default: 0 },
    grandTotal: { type: Number, default: 0 },
    payType: { type: Number, default: 0 }
  },
  data() {
    return {
      isOpen: true,
      selectedClientId: "",
      selectedClient: null,
      InvoiceTemplateCode: "",
      payReference: "",
      cashReceived: 0,
      paymentSuccess: false,
      errors: {},
    };
  },
  computed: {

    remainingBalance() {
      const balance = this.cashReceived - this.grandTotal;
      return balance >= 0 ? balance : 0; // prevent negative if you want
      }
    },

  async created() {
    this.userStore = useUserStore();    
    this.posStore = useposStore();
    this.showLoading = this.$showLoading;

    const granted = this.userStore.loggedUser?.granted || [];
    if (!granted.includes('pos')) {
      this.$router.push('/user/login');
      this.$showToast('Not Allowed to access this page');
      return;
    }

    await this.posStore.listClients(this.showLoading); 
 
  },

  methods: {
    onClientSelect() {
      this.selectedClient = this.posStore.listClients.find(
        client => client.id === this.selectedClientId
      );
    },


    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    async submitPayment() {
      if (!this.validateForm()) ;
      const result = await this.$showConfirm(
        "Are you sure to Save this Lead?", "warning"
      );
      if (!result.isSuccess);
      const payload = {
        ClientId: this.selectedClientId,
        InvoiceTemplateCode: this.InvoiceTemplateCode,
        PayType: this.payType,
        PayReference: this.payReference,
        WholeDiscount: this.subDiscount,
        ReceiptItems: this.cart.map((item, index) => ({
          Index: index + 1,
          ItemId: item.id,
          UnitPrice: item.price,
          Quantity: item.qty,
          Discount: item.discount || 0
        }))
      };

      // console.log("Payload to send:", payload);

      try {
        await this.posStore.makePayment(payload, this.showLoading);

        this.paymentSuccess = true;

        this.resetForm();
        // this.closeModal();
      } catch (err) {
        console.error(err);
        this.$showToast("Payment Failed", "error");
      }
    },



    resetForm() {
      this.selectedClientId = "";
      this.selectedClient = null;
      this.InvoiceTemplateCode = "";
      this.payReference = "";
      this.cashReceived = 0;
      this.UnitPrice = "";
    },

    validateForm() {
      this.errors = {};
      let valid = true;

      if (!this.selectedClientId) {
        this.errors.client = "Please select a client";
        valid = false;
      }
      if (!this.InvoiceTemplateCode) {
        this.errors.InvoiceTemplateCode = "Invoice code is required";
        valid = false;
      }
      if (!this.payReference) {
        this.errors.payReference = "Pay reference is required";
        valid = false;
      }
      // if (this.cashReceived <= 0) {
      //   this.errors.cashReceived = "Cash received must be greater than 0";
      //   valid = false;
      // }
      return valid;
    },

  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal {
  background: white;
  width: 90%;
  max-width: 800px;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: 90%;
}
.modal-header {
  background: #0b2145;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-content {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}
.confirm-button {
  background: #0b2145;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
.cancel-button {
  background: #e4e4e4;
  padding: 10px 20px;
  border-radius: 5px;
}


</style>
