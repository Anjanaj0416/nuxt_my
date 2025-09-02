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
        <div v-if="posStore.holdPayments.length > 0" class="flex flex-col gap-4">
          
        <div v-if="posStore.holdPayments.length > 0">
          <div v-for="(bill, index) in posStore.holdPayments" :key="bill.billNo" class="border border-gray-200 rounded-t-xl mb-2">
            <h2>
              <button
                type="button"
                class="flex flex-col sm:flex-row sm:items-center justify-between w-full p-5 font-medium text-gray-700 border-b border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 gap-3"
                @click="toggleAccordion(index)"
              >
                <!-- Left: Bill info -->
                <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                    </svg>
                    Bill #{{ bill.billNo }}
                  </span>

                  <span class="flex items-center gap-1 text-gray-500 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"/>
                    </svg>
                    {{ bill.date }}
                  </span>

                  <span class="flex items-center gap-1 text-gray-500 text-sm">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {{ bill.time }}
                  </span>
                </div>

                <!-- Right: Accordion icon -->
                <svg :class="{'rotate-180': activeAccordion === index}" class="w-3 h-3 shrink-0 transition-transform text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                </svg>
              </button>

            </h2>
            <div v-show="activeAccordion === index" class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
              <ul class="space-y-2">
                <li v-for="item in bill.items" :key="item.id" class="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-2 rounded-lg">
                  <div class="flex items-center gap-2">
                    <img :src="item.itemImage" alt="" class="w-10 h-10 rounded" />
                    <div>
                      <p class="font-semibold text-gray-800">{{ item.itemName }}</p>
                      <p class="text-sm text-gray-500">Qty: {{ item.qty }}</p>
                    </div>
                  </div>
                  <div class="text-gray-700 font-medium">LKR:{{ item.price }}</div>
                </li>
              </ul>
              <div class="mt-4 flex justify-end">
                <button
                  class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  @click="loadBill(bill)"
                >
                  Add
                </button>
              </div>
            </div>
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
import { useRouter } from 'vue-router';

export default {
  components: { closebtn },
  data() {
    return {
      isOpen: true,
      activeAccordion: 0,
    };
  },

  async created() {
    this.userStore = useUserStore();    
    this.posStore = useposStore();
    this.showLoading = this.$showLoading;

    const granted = this.userStore.loggedUser?.granted || [];

    if (granted.includes('pos') ) {
    }
    else{
      this.$router.push('/user/login');
      this.$showToast('Not Allowed to access this page');
    }
   await this.posStore.holdPayments(this.showLoading);
  },

  

  methods: {
    toggleAccordion(index) {
      this.activeAccordion = this.activeAccordion === index ? null : index;
    },
    closeModal() {
      this.isOpen = false;
      this.$emit("close");
    },
    
   loadBill(bill) {
      const items = bill.items;
      console.log(items);
      this.posStore.selectedPayment(items);
      this.$router.push('/pos');
      // this.$emit("loadBill", items);
      // this.closeModal();
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
