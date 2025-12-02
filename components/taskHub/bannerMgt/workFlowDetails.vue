<template>
<section class="justify-center">
  <div class="flex flex-col-reverse items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
    <div class="text-2xl uppercase">Invoice</div>
  </div>
  <!-- {{ taskhubStore.workFlowDetailsList }} -->
  <div class="relative  border-gray-200 overflow-auto max-h-660 space-y-6">
    <div v-if="taskhubStore.workFlowDetailsList && taskhubStore.workFlowDetailsList.length > 0" class="relative">
      <div 
        v-for="(inst, iIndex) in taskhubStore.workFlowDetailsList"
        :key="iIndex"
        class="p-4 rounded-lg shadow-md border transition border-gray-500 my-3"
      >
        <!-- Header -->
        <div class="flex justify-between items-center flex-wrap gap-1 border-b pb-1">
          <div class="flex items-center gap-1 text-gray-600">
              📅 <span class="font-medium">{{ inst.daysTaken }}</span>
          </div>
          <!-- <span 
            class="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700"
          >
            Pending
          </span> -->
        </div>

        <!-- Installment details -->
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-1 mt-2 text-xs">
          <div>
            <span class="font-semibold text-gray-500">Assigned To :</span>
            <span class="ml-1 text-gray-700">{{ inst.assignedTo }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-500">Assigned Date :</span>
            <span class="ml-1 text-gray-700">{{ inst.assignedDate }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-500">Completed Date :</span>
            <span class="ml-1 text-gray-700">{{ inst.completedDate }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-500">Comment :</span>
            <span class="ml-1 text-gray-700">{{ inst.comment }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-500">Status :</span>
            <span class="ml-1 text-gray-700">{{ inst.status }}</span>
          </div>
        </div>

      
        <div class="mt-4 max-w-full overflow-auto max-h-80">
          <div 
            v-if="inst.resourceFiles && inst.resourceFiles.length > 0"
            class="space-y-2"
          >
            <div
              v-for="(item, pIndex) in inst.resourceFiles"
              :key="pIndex"
              class="bg-white hover:shadow-md transition-all duration-200 text-xs"
            >

              <!-- One row, 3 columns -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-1 mt-2 items-center">

                <!-- Column 1 -->
                <div>
                  <span class="font-semibold text-gray-500">File Name</span>
                  <span class="ml-1 text-gray-700">{{ item.fileName }}</span>
                </div>

                <!-- Column 3 -->
                <div>
                  <a
                    v-if="item.url"
                    :href="item.url"
                    target="_blank"
                    class="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    📄 resourceFiles
                  </a>
                  <span v-else class="text-gray-400 italic">No slip</span>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
  </section>
</template>

<script>
import { useTaskhubStore } from "~/stores/modules/taskHub/taskhubStore";

export default {
  props: ['taskHubId'],
  data() {
    return {
      workFlowDetailsList: []
    }
  },
  async created() {
    this.taskhubStore = useTaskhubStore();

    await this.taskhubStore.WorkFlowDetails( this.taskHubId,this.showLoading);
    this.workFlowDetailsList = this.taskhubStore.workFlowDetailsList;

  }
}
</script>
