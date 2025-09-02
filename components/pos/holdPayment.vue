<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Hold Payments</h2>
        <closebtn @close="closeModal()" />
      </div>

      <!-- Modal Content -->
      <div class="p-6 overflow-y-auto flex flex-col">
        <div v-if="holdPayments.length > 0" class="flex flex-col gap-4">
          <div 
            v-for="(bill, index) in holdPayments" 
            :key="index"
            class="flex justify-between items-center bg-gray-50 hover:bg-gray-100 border rounded-lg p-4 shadow-sm transition"
          >
            <div>
              <p class="font-semibold text-gray-800">Bill #{{ bill.billNo }}</p>
              <p class="text-sm text-gray-600">Customer: {{ bill.customer || 'Walk-in' }}</p>
              <p class="text-xs text-gray-500">Date: {{ bill.date }}</p>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-bold text-indigo-600">Rs. {{ bill.total.toFixed(2) }}</span>
              <button 
                class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                @click="loadBill(bill)"
              >
                Load
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center text-gray-500 py-10">
          <p>No held payments available</p>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer">
        <button @click="closeModal" class="cancel-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "~/stores/modules/userStore";
import { useposStore } from "~/stores/modules/pos/posStore";
import closebtn from "~/components/customcontrol/modal_close_button";

export default {
  components: { closebtn },
  data() {
    return {
      isOpen: true,
      holdPayments: [
        { billNo: "1001", customer: "Kasun", date: "2025-09-01", total: 2500.00, items: [{name:"Tyre", qty:2, price:1250}] },
        { billNo: "1002", customer: "Nimal", date: "2025-09-01", total: 4500.00, items: [{name:"Battery", qty:1, price:4500}] },
        { billNo: "1003", customer: "Walk-in", date: "2025-08-31", total: 1500.00, items: [{name:"Oil Filter", qty:3, price:500}] }
      ],
    };
  },

  methods: {
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },

    loadBill(bill) {
      // Send selected bill to POS page
      this.$emit("loadBill", bill);
      this.closeModal();
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
.modal-footer {
  background: #f1f1f1;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
}
.cancel-button {
  background: #e4e4e4;
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
