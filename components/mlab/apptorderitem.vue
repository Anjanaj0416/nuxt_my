<template>
  <article
    class="border-2 p-2"
    :class="apptstatus === 'pending' ? 'border-EF-blue' : 'border-EF-blue'"
  >
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-2 items-center">
      <div>{{ billitem.testtype }}</div>
      <div>{{ billitem.testname }}</div>
      <div class="lg:w-24 lg:text-right">{{ formatLKR(billitem.charge) }}</div>
      <div>{{ billitem.labname }}</div>
      <div>{{ billitem.comment }}</div>

      <div class="flex justify-end gap-x-2">
        <!-- Edit -->
        <div
          class="cssbtn cursor-pointer bg-EF-blue"
          title="Edit Test"
          @click="editReport"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>

        <!-- Delete -->
        <div
          class="cssbtn cursor-pointer bg-EF-blue"
          title="Delete Test"
          @click="deleteItem"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <!-- Print -->
        <div
          class="cssbtn cursor-pointer bg-EF-blue"
          title="Download Report"
          @click="printReport"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
        </div>

        <!-- Print PDF -->
        <div
          class="cssbtn cursor-pointer bg-EF-blue"
          title="Print PDF Report"
          @click="printPdfReport"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    billitem: { type: Object, required: true },
    apptid: { type: [String, Number], required: true },
    apptstatus: { type: String, default: 'pending' },
  },
  computed: {
    ...mapState({
      loggeduser: (state) => state.loggeduser,
    }),
  },
  methods: {
    ...mapMutations({
      setCurOrderItem: 'labappt/SET_CURRENT_ORDER_ITEM',
    }),

    formatLKR(val) {
      return this.$options.filters.toLKR ? this.$options.filters.toLKR(val) : val
    },

    deleteItem() {
      if (this.billitem.islock === 1) {
        alert('This Report is locked, Cannot Delete')
        return
      }
      if (!confirm('Do you want to remove this test?')) return
      this.$emit('itemdelete', this.billitem)
    },

    editReport() {
      if (this.billitem.islock === 1) {
        alert('This Report is locked, Cannot Edit')
        return
      }
      this.setCurOrderItem(this.billitem)
      this.$emit('getEditReport', {
        orderitem_id: this.billitem.id,
        testid: this.billitem.testid,
        apptid: this.apptid,
        labname: this.billitem.labname,
      })
    },

    printReport() {
      this.$emit('getPrintReport', {
        orderitemid: this.billitem.id,
        print_type: 'print',
        user: this.loggeduser,
      })
    },

    printPdfReport() {
      this.$emit('getPdfReport', {
        orderitemid: this.billitem.id,
        print_type: 'pdf',
        user: this.loggeduser,
      })
    },
  },
}
</script>

<style scoped>
.cssbtn {
  @apply rounded-full h-8 w-8 text-center text-white p-1 flex justify-center items-center;
}
.cssbtn:hover {
  @apply transform scale-125 duration-500;
}

.cssbtn_lock {
  @apply rounded-full text-white bg-red-500 p-1;
}
.cssbtn_lock:hover {
  @apply transform scale-125 duration-500;
}
</style>
