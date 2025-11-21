<template>
  <section class="justify-center">
    <div class="bg-white p-2 text-sm text-gray-800">
      <div class="mb-6">
        <div class="flex flex-wrap items-center justify-between md:mb-3 lg:mb-3">
          <div class="text-xl sm:text-xl md:text-2xl uppercase sm:mb-3 lg:mb-3 mb-0">
                Work flow
          </div>
        </div>
        <div class="">
            <span class="text-sm text-gray-500">{{ progress }}% complete</span>
        </div>
      </div>
      <!-- Timeline -->
      <div class="border rounded-lg shadow-md">
        <ol class="items-center sm:flex  p-6">
          <li
              v-for="(step, index) in listVendorOnboadingWF"
              :key="index"
              class="relative mb-6 sm:mb-0 flex-1"
          >
              <div class="flex items-center">
              <!-- Circle -->
              <div
                  class=" flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 shrink-0"
                  :class="{
                  'bg-green-500 text-white': step.status === 'Completed',
                  'bg-blue-500 text-white': step.status === 'In Progress',
                  'bg-gray-300 text-gray-500': step.status === 'Pending'
                  }"
              >
                  <svg
                    v-if="step.status === 'Completed'"
                    class="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8.364 8.364a1 1 0 01-1.414 0L3.293 11.05a1 1 0 111.414-1.414L7.636 12.56l7.95-7.95a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                  </svg>
                  <svg
                    v-else
                    class="w-2.5 h-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                  <circle cx="10" cy="10" r="10" />
                  </svg>
              </div>

              <!-- Connector -->
              <div
                class="hidden sm:flex w-full h-0.5"
                :class="{
                  'bg-green-500': step.status === 'Completed',
                  'bg-blue-500': step.status === 'In Progress',
                  'bg-gray-300': step.status === 'Pending'
                }"

              ></div>

              </div>

              <!-- Step Info -->
              <div class="mt-3 sm:pe-8">
                <h3 class="text-lg font-semibold text-gray-900">{{ step.nodeName }}</h3>
                <time class="block mb-1 text-sm font-normal text-gray-500">{{ step.completedDate || "No date"}}</time>
              </div>
              <span
                :class="{
                  'bg-green-100 text-green-700': step.status === 'Completed',
                  'bg-orange-100 text-orange-800': step.status === 'In Progress',
                  'bg-yellow-100 text-bolt text-yellow-800 ': step.status === 'Pending',
                }"
                class="text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
              >
                {{ step.status }}
              </span>
          </li>
        </ol>

        <div v-if="listVendorOnboadingWF.length === 0" class="text-center text-gray-900 mt-0 text-sm font-medium">
          <p>No Work flow available...</p>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import { useVendorStore } from "~/stores/modules/qms/vendorStore";

export default {
  props: ["vendorId"],
  data() {
    return {
      listVendorOnboadingWF:"",
    };
  },
  computed: {
    workflowArray() {
      return Object.values(this.listVendorOnboadingWF).map(node => ({
      }));
    },

    progress() {
      const total = this.workflowArray.length;
      const completed = this.workflowArray.filter(s => s.status === "Completed").length;
      return Math.round((completed / total) * 100);
    }
  },
  async created() {
    this.showLoading = this.$showLoading;
    this.vendorStore = useVendorStore();
    await this.vendorStore.GetVendorOnboadingWorkflow(this.vendorId,this.showLoading);
    this.listVendorOnboadingWF = this.vendorStore.listVendorOnboadingWF;
  },
};
</script>

<style scoped>
@keyframes glow {
  0% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.9);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
}

.animate-glow {
  animation: glow 1.5s infinite ease-in-out;
}
</style>
