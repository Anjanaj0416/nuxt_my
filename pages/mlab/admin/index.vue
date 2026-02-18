<template>
  <section class="mt-12 -m-2 cssAccSumemry">
    <div>
      <div class="heading">
        <div class="text-xl uppercase">Account Summary</div>
        <div class="text-gray-800">
          {{ accountSummeryDetails.companyName }} - {{ accountSummeryDetails.city }}
        </div>
      </div>

      <div class="cssBalance relative flex items-center justify-center">
        <div class="text-6xl animate-pulse">
          {{ toLKR(accountSummeryDetails.balanceDetails.dueAmount) }}
        </div>
        <div class="absolute top-0 right-0 pt-2 pr-2">
          <div class="text-base">
            Balance @{{ accountSummeryDetails.balanceDetails.balanceAt }}
          </div>
          <div class="text-xs">
            Due Date - {{ getFormatDate(accountSummeryDetails.balanceDetails.dueDate) }}
          </div>
        </div>
      </div>

      <div class="tbheading">
        <div>Description</div>
        <div>Charges/Payment</div>
      </div>

      <div>
        <div
          v-for="(item, idx) in accountSummeryDetails.arrItems"
          :key="idx"
          class="tbdata"
        >
          <div v-show="item.type === 'balance'">
            <div class="row">
              <div>
                <div>{{ item.arrDescription[0] }}</div>
                <div class="btn w-16" @click="isShowPayInfo = !isShowPayInfo">
                  Pay
                </div>
              </div>
              <div class="text-lg">{{ toLKR(item.value) }}</div>
            </div>

            <div v-show="isShowPayInfo" class="px-2">
              <div class="shadow-outline rounded w-full h-auto pb-1 my-4">
                <div
                  class="
                    text-center
                    rounded-t
                    h-8
                    flex
                    justify-center
                    text-lg
                    items-center
                    bg-EF-blue
                    text-white
                  "
                >
                  Payment Details
                </div>
                <div class="p-1">
                  <div>
                    Please deposit your payments to the bank details shown below
                  </div>

                  <div class="flex justify-between bg-gray-500 mt-1 px-1">
                    <div class="text-gray-800">Bank</div>
                    <div class="text-lg">{{ accountSummeryDetails.payDetails.bank }}</div>
                  </div>
                  <div class="flex justify-between bg-gray-500 mt-1 px-1">
                    <div class="text-gray-800">Account Name</div>
                    <div class="text-lg text-right">{{ accountSummeryDetails.payDetails.accName }}</div>
                  </div>
                  <div class="flex justify-between bg-gray-500 mt-1 px-1">
                    <div class="text-gray-800">Account No.</div>
                    <div class="text-lg">{{ accountSummeryDetails.payDetails.accNumber }}</div>
                  </div>
                  <div class="flex justify-between bg-gray-500 mt-1 px-1">
                    <div class="text-gray-800">Pay Reference</div>
                    <div class="text-lg">{{ accountSummeryDetails.payDetails.yourPayRefernce }}</div>
                  </div>
                </div>

                <div class="p-2 shadow-outline mx-2 my-4 rounded">
                  Upload Payment Receipt
                  <receipt_fileupload
                    v-model="receipt_Uploading_file_details.file"
                    caption=""
                    @FileChanged="receiptFileChanged"
                    ref="refreceipt"
                  />
                  <div
                    class="btn w-16"
                    @click="getSavePayment"
                    :class="{ 'opacity-50 cursor-not-allowed': !isreceiptChanged }"
                  >
                    Upload
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="item.type === 'payment'">
            <div class="row">
              <div>
                <div>{{ item.arrDescription[0] }}</div>
                <div class="btn w-32" @click="viewReceipt(item)">View Receipt</div>
              </div>
              <div class="text-lg">{{ toLKR(item.value) }}</div>
            </div>
          </div>

          <div v-show="item.type === 'monthbill'">
            <div class="row">
              <div>
                <div class="flex flex-wrap gap-2">
                  <div v-for="(desc, dIdx) in item.arrDescription" :key="dIdx" class="tag">
                    {{ desc }}
                  </div>
                </div>
                <div class="btn w-16">Invoice</div>
              </div>
              <div class="text-lg">{{ toLKR(item.value) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as Global from '@/assets/js/Global'
import receipt_fileupload from '~/components/customcontrol/img_fileupload'

export default {
  components: { receipt_fileupload },
  data() {
    return {
      isShowPayInfo: true,
      isreceiptChanged: false,
      imageroot_mcle: process.env.McleAssets,
      receipt_Uploading_file_details: {
        file: '',
        destpath: '',
        filetype: 'png',
        height: 100,
        width: 150,
      },
      accountSummeryDetails: {
        companyName: 'Lanka Labs',
        city: 'Divulapitiya',
        payDetails: {
          bank: 'Sampath',
          accName: 'Miracle Software Solutions',
          accNumber: '1183-1401-6680',
          yourPayRefernce: '0715321168',
        },
        balanceDetails: {
          dueAmount: 1500,
          dueDate: '2022-02-04',
          balanceAt: 'Feb/2022',
        },
        arrItems: [
          { type: 'balance', arrDescription: ['Due-Balance @Feb/2022'], status: '', value: 1500.0 },
          { type: 'payment', arrDescription: ['Payment 12/Feb/2022'], status: '', value: 5000.0 },
          {
            type: 'monthbill',
            arrDescription: ['NOTs Feb 2021 - 210', 'Rate-3.50', 'Min Per Month - 300 NOTs'],
            status: '',
            value: 5000.0,
          },
        ],
      },
    }
  },
  methods: {
    getFormatDate(dt) {
      if (!dt) return ''
      return Global.getDateFormat1(new Date(dt))
    },
    toLKR(value) {
      return value.toLocaleString('en-LK', { style: 'currency', currency: 'LKR' })
    },
    receiptFileChanged() {
      this.isreceiptChanged = true
    },
    getSavePayment() {
      if (!this.isreceiptChanged) return
      alert('Payment Saved')
      this.isreceiptChanged = false
      this.receipt_Uploading_file_details.file = ''
    },
    viewReceipt(item) {
      alert('Receipt for ' + item.arrDescription[0])
    },
  },
}
</script>

<style scoped>
.cssBalance {
  @apply h-48 bg-EF-blue text-white;
}

.cssAccSumemry {
  @apply max-w-lg mx-auto;
}

.heading {
  @apply bg-gray-400 p-2 text-center;
}

.tbheading {
  @apply flex justify-between text-sm p-2 bg-EF-blue text-white;
}

.tbdata {
  @apply text-sm bg-gray-300 border-b-2 border-EF-blue;
}

.row {
  @apply flex justify-between px-2 py-1;
}

.btn {
  @apply shadow-outline my-1 py-2 text-center rounded cursor-pointer bg-EF-blue text-white;
}

.tag {
  @apply bg-gray-500 text-xs rounded w-auto p-1;
}
</style>
