<template>
<section class="">
  <div class="text-2xl uppercase mt-2">Work Flow</div>

  <div class="flex flex-col gap-2 p-4 mt-0 bg-white ">
    <div
      v-if="taskhubStore.workFlowDetailsList && taskhubStore.workFlowDetailsList.length > 0"
      class="space-y-4"
    >
      <div
        v-for="(inst, iIndex) in taskhubStore.workFlowDetailsList"
        :key="iIndex"
        class="p-4 rounded-lg shadow-md border transition border-gray-300 my-3"
      >

        <!-- Header Row -->
        <div class="flex justify-between items-center flex-wrap gap-2 border-b pb-2">
          <div class="flex items-center gap-2 text-gray-600 text-sm">
            <span class="text-xl">📅</span>
            <span class="font-medium text-gray-700">{{ inst.daysTaken }} Days</span>
          </div>

          <span
            v-if="inst.status"
            class="px-3 py-1 text-xs font-semibold rounded-full"
            :class="{
              'bg-yellow-100 text-yellow-600': inst.status === 'Pending',
              'bg-green-100 text-green-600': inst.status === 'Completed',
              'bg-blue-100 text-blue-600': inst.status === 'In Progress'
            }"
          >
            {{ inst.status }}
          </span>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-2 gap-y-1 mt-2 text-xs">
          <div>
            <span class="font-semibold text-gray-500">Assigned To:</span>
            <span class="ml-1 text-gray-700">{{ inst.assignedTo }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-500">Assigned Date:</span>
            <span class="ml-1 text-gray-700">{{ inst.assignedDate }}</span>
          </div>
          <div>
            <span class="font-semibold text-gray-500">Completed Date:</span>
            <span class="ml-1 text-gray-700">{{ inst.completedDate }}</span>
          </div>
          <div class="col-span-1 sm:col-span-3">
            <span class="font-semibold text-gray-500">Comment:</span>
            <span class="ml-1 text-gray-700">{{ inst.comment }}</span>
          </div>
        </div>

        <!-- Resources -->
        <div class="mt-4 border-t pt-3">
          <h3 class="text-gray-700 font-semibold text-sm mb-2">Resource Files</h3>

          <div v-if="inst.resourceFiles && inst.resourceFiles.length > 0" class="space-y-2">

            <div
              v-for="(item, pIndex) in inst.resourceFiles"
              :key="pIndex"
              class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <div class="text-sm">
                <span class="font-semibold text-gray-500">📄 {{ item.fileName }}</span>
              </div>

              <div>
                <a
                  v-if="item.url"
                  :href="item.url"
                  target="_blank"
                  class="text-blue-600 text-sm font-medium hover:underline"
                >
                  View File
                </a>
                <span v-else class="text-gray-400 italic text-sm">No File</span>
              </div>
            </div>

          </div>

          <div v-else class="text-gray-400 text-xs italic">No resource files available.</div>
        </div>

      </div>
      <!-- End Each Card -->

    </div>

    <!-- If empty -->
    <div v-else class="text-gray-500 text-center py-6">
      No Work Flow Details available.
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
            this.showLoading = this.$showLoading;

    await this.taskhubStore.WorkFlowDetails(this.taskHubId, this.showLoading);


    // Assign fetched data to local state
    this.workFlowDetailsList = this.taskhubStore.workFlowDetailsList;
  }
}
</script>
