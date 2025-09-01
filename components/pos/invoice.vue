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
      billData: {},
      loggedUser: { name: 'Operator 1' }
    };
  },
  computed: {

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
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    triggerThermalPrint() {
      // Set your bill object
      this.billData = {
        logo: 'https://w7.pngwing.com/pngs/195/996/png-transparent-shopping-cart-computer-icons-online-shopping-symbol-shopping-logo-design-supermarket-bag-shopping-list.png',
        name: 'John Doe',
        billNo: 'BILL-2025-001',
        address: '123 Main Street, Colombo',
        hotline: '011 234 5678',
        age: 32,
        sex: 'Male',
        date: '2025-08-28',
        time: '14:30',
        items: [
          { description: 'Consultation', amount: 1500 },
          { description: 'Blood Test', amount: 500 },
          { description: 'X-Ray', amount: 1200 },
        ],
        grossTotal: 3200,
        discount: 200,
        netTotal: 3000,
        payment: 3000,
        balance: 0
      };

      // Call print method in ThermalPrint
      this.$refs.thermalPrinter.print();
    }
 

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
