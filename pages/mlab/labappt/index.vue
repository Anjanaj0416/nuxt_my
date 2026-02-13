<template>
  <section>
    <!-- Main Appointment View -->
    <article v-if="cur_view === ''">
      <!-- Top Controls -->
      <div class="bg-EF-blue fixed top-0 mt-10 z-40 -mx-2 pb-4 lg:px-4 w-full">
        <div class="relative py-2">
          <!-- Action Buttons -->
          <div class="absolute bottom-0 -mb-4 top-0 right-0 flex mt-4 mr-2 lg:mt-6 gap-x-4">
            <!-- New Appointment -->
            <div class="cssbtn w-16 lg:w-auto text-blue-400 cursor-pointer mt-2 flex justify-end"
                 title="New Appointment" @click="viewMobilepick">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>

            <!-- Pending Appointments -->
            <div class="cssbtn text-sm lg:text-base cursor-pointer py-1 px-2 h-12 text-blue-400 rounded-lg flex items-center gap-x-2"
                 title="View Pending Appts" @click="search_pending_appts()">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              <div class="font-bold">{{ apptresult.noofapptpending }}</div>
            </div>

            <!-- Refresh Appointments -->
            <div class="cssbtn text-sm lg:text-base cursor-pointer pt-1 px-2 h-12 flex items-center text-blue-400 rounded-lg"
                 title="Refresh Appts" @click="getRefresh()">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
            </div>
          </div>

          <!-- Search Section -->
          <div class="flex w-full mt-12 lg:mt-0 pt-6 lg:gap-x-4">
            <div class="w-full px-4 lg:px-0 lg:w-1/2 mx-auto">
              <search_bysections placeholder="Appoinment Search , Press Enter"
                                 :arrsections="arrsections"
                                 :arrDateRange="arrDateRange"
                                 @getsearch="getSearchFromAll"/>
            </div>
          </div>
        </div>
      </div>

      <!-- Appointments List -->
      <div class="mt-48 lg:mt-32 lg:pt-4">
        <div v-for="appt in alappt" :key="appt.id" v-if="appt.status === 1"
             class="cssapptrow p-2 mx-2 shadow-xl rounded-xl relative mb-2 border-2"
             :class="appt.apptstatus === 'pending' ? 'border-EF-blue' : 'bg-EF-blue'">

          <!-- Expand/Collapse -->
          <div class="cssbtn absolute top-0 right-0 p-2 cursor-pointer"
               :class="appt.apptstatus === 'pending' ? 'text-EF-blue' : 'text-white'"
               @click="toggleApptDetails(appt.id)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 lg:h-10 lg:w-10" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
            </svg>
          </div>

          <!-- Compact View -->
          <div v-if="!isExpanded(appt)" class="grid grid-cols-1 p-4 lg:grid-cols-5">
            <info lable="Bill No" :text="appt.billno" :cssStatus="statusClass(appt.apptstatus)"/>
            <info lable="Appt Date" :text="getFormatDate(appt.apptdate)" :cssStatus="statusClass(appt.apptstatus)"/>
            <info lable="Patient" :text="appt.name + ' | ' + appt.mobile + ' | ' + appt.age" :cssStatus="statusClass(appt.apptstatus)"/>
            <info lable="Token" :text="appt.token" :cssStatus="statusClass(appt.apptstatus)"/>
            <info lable="Appt Status" :text="appt.apptstatus" :cssStatus="statusClass(appt.apptstatus)"/>
          </div>

          <!-- Expanded View -->
          <div v-else>
            <div class="grid grid-cols-2 lg:grid-cols-8 gap-2">
              <info v-for="field in expandedFields(appt)" :key="field.label"
                    :lable="field.label" :text="field.text" :cssStatus="statusClass(appt.apptstatus)"/>
            </div>

            <!-- Order Details Section -->
            <div class="mt-4 w-full text-EF-green-300 border-2 border-EF-blue bg-blue-200 px-2 py-4 rounded-lg">
              <div class="lg:flex lg:gap-x-4">
                <div class="mb-2 font-bold text-EF-green-300 relative">
                  Order Details
                  <div v-if="showPopup.email || showPopup.sms" class="cssreceipientbox absolute top-0 left-0 mt-8 bg-white rounded pb-4 p-2 cssborder">
                    <PickMobileReportRecipients v-if="showPopup.sms"
                                               @exit="showPopup.sms = false"
                                               :arrRecipients="arrSMSRecipients"
                                               :appt="appt"
                                               @sendReportsToClient="sendReportsManual"/>
                    <PickEmailReportRecipients v-if="showPopup.email"
                                              @exit="showPopup.email = false"
                                              :arrRecipients="arrEmailsAppRecipients"
                                              :appt="appt"
                                              @sendReportsToClient="sendReportsManual"/>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-x-4 lg:flex-none">
                  <div class="cssbtn text-EF-green cursor-pointer pb-2 hover:text-EF-blue"
                       title="Add New Test" @click="cur_view = 'pickreportname'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>

                  <div class="cssbtn hover:text-EF-blue text-EF-green cursor-pointer" @click="PrintTicket(appt)" title="Print Bill">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                  </div>

                  <div class="cssbtn cssbtn_lock cursor-pointer" title="Complete Order" @click="Complete_Order(appt)">
                    <svg v-show="appt.apptstatus === 'pending'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                    </svg>
                    <svg v-show="appt.apptstatus === 'completed'" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600"
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>

                  <div class="cssbtn hover:text-EF-blue text-EF-green cursor-pointer" @click="DeleteAppt(appt)" title="Delete Order">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>

                  <div class="cssbtn hover:text-EF-blue text-EF-green cursor-pointer" @click="setEmail(appt)" title="Email Reports">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>

                  <div class="cursor-pointer" :cssStatus="statusClass(appt.apptstatus)" @click="setForSMS(appt)" title="WhatsApp Reports">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>

                  <div class="cursor-pointer" :cssStatus="statusClass(appt.apptstatus)" @click="setNotify_Customer(appt)" title="Notify Customer to Collect Reports">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-8 w-8" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Bill Items Table Header -->
              <div class="grid grid-cols-1 lg:grid-cols-6 text-EF-green-100 px-2 rounded pt-2 lg:pt-4 h-auto lg:h-12" :class="appt.apptstatus === 'pending' ? 'bg-EF-blue' : 'bg-EF-blue'">
                <div>Test Type</div>
                <div>Test Name</div>
                <div>Chargers</div>
                <div>Lab Name</div>
                <div>Comment</div>
                <div></div>
              </div>

              <!-- Bill Items -->
              <div v-for="item in activeBillItems(appt)" :key="item.id">
                <apptorderitem :apptstatus="appt.apptstatus" :billitem="item" :apptid="appt.id"
                               @itemdelete="itemdelete(appt.bill, item)"
                               @getEditReport="getEditReport"
                               @getPrintReport="getPrintReport"
                               @getPdfReport="getPdfReport"
                               @getEmailReport="getEmailReport"
                               class="border-b-2 border-EF-green my-1 rounded-xl"/>
              </div>

              <!-- Payment Summary -->
              <apptbillpayment :apptstatus="appt.apptstatus"
                              :appt_id="appt.id"
                              :total="appt.bill.billpay.netTotal"
                              :cash="appt.bill.billpay.cash"
                              :discount="appt.bill.billpay.discount"
                              :balance="appt.bill.billpay.balance"
                              :ispaid="appt.bill.ispaid"
                              @billcalc="billcashcalc"/>
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- Mobile Pick View -->
    <mobilepick_form v-if="cur_view === 'mobilepick'" text="Mobile"
                     v-model="p_mobile" @getexitform="cur_view = ''" @loadApptForm="loadApptForm"/>

    <!-- Pick Report Name -->
    <pick_report_name v-if="cur_view === 'pickreportname'" :appt_id="cur_apptid"
                      @getexitform="cur_view = ''" @setOrder="addNewOrderItem"/>

    <!-- New Appointment Form -->
    <new_appt_form v-if="cur_view === 'newappt'" ref="newappt" @getexitform="cur_view = ''"/>

    <!-- Report Form -->
    <report_form v-if="cur_view === 'report'" :report_details="report_details"
                 @getexitform="cur_view = ''" ref="refreport_form"/>

    <!-- Bill View -->
    <article v-if="cur_view === 'bill'" class="w-screen bg-white absolute top-0 left-0">
      <bill :bill="bill" @closebill="closebill"/>
    </article>
  </section>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import * as Global from '@/assets/js/Global'

import report_form from '~/components/reports/report_form'
import new_appt_form from '~/components/mlab/new_appt_form'
import mobilepick_form from '~/components/mlab/pickinfo'
import pick_report_name from '~/components/mlab/pick_report_name'
import apptorderitem from '~/components/mlab/apptorderitem'
import apptbillpayment from '~/components/mlab/apptbillpayment'
import PickMobileReportRecipients from '~/components/mlab/pickmobilereportrecipients'
import PickEmailReportRecipients from '~/components/mlab/pickemailreportrecipients'
import info from '~/components/mlab/info'
import search_bysections from '~/components/mlab/search_bysections'
import bill from '~/components/mlab/bill'

export default {
  components: {
    report_form,
    new_appt_form,
    mobilepick_form,
    pick_report_name,
    apptorderitem,
    apptbillpayment,
    PickMobileReportRecipients,
    PickEmailReportRecipients,
    info,
    search_bysections,
    bill
  },
  data() {
    return {
      cur_view: '',
      cur_apptid: null,
      showPopup: { email: false, sms: false },
      p_mobile: null,
      report_details: {},
      arrsections: [],
      arrDateRange: [],
      alappt: [],
      apptresult: { noofapptpending: 0 },
      arrSMSRecipients: [],
      arrEmailsAppRecipients: [],
      bill: {}
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['getRefresh', 'getSearchFromAll']),
    ...mapMutations(['loadApptForm']),

    toggleApptDetails(apptId) {
      this.cur_apptid = this.cur_apptid === apptId ? null : apptId
    },
    isExpanded(appt) {
      return this.cur_apptid === appt.id
    },
    statusClass(status) {
      return status === 'pending' ? 'cssPending' : 'cssCompleted'
    },
    expandedFields(appt) {
      return [
        { label: 'Bill No', text: appt.billno },
        { label: 'Appt Date', text: this.getFormatDate(appt.apptdate) },
        { label: 'Patient', text: `${appt.name} | ${appt.mobile} | ${appt.age}` },
        { label: 'Token', text: appt.token },
        { label: 'Appt Status', text: appt.apptstatus },
        { label: 'Doctor', text: appt.docname },
        { label: 'Lab', text: appt.labname },
        { label: 'Report Count', text: appt.bill.albillitems.length }
      ]
    },
    activeBillItems(appt) {
      return appt.bill.albillitems.filter(i => i.status === 1)
    },
    getFormatDate(date) {
      return Global.formatDate(date)
    },
    viewMobilepick() { this.cur_view = 'mobilepick' },
    setEmail(appt) { this.showPopup = { email: true, sms: false } },
    setForSMS(appt) { this.showPopup = { email: false, sms: true } },
    PrintTicket(appt) { setTimeout(() => window.print(), 1000) },
    Complete_Order(appt) { /* logic */ },
    DeleteAppt(appt) { /* logic */ },
    setNotify_Customer(appt) { /* logic */ },
    sendReportsManual(appt) { /* logic */ },
    addNewOrderItem(order) { /* logic */ },
    getEditReport(report) { /* logic */ },
    getPrintReport(report) { /* logic */ },
    getPdfReport(report) { /* logic */ },
    getEmailReport(report) { /* logic */ },
    billcashcalc(payment) { /* logic */ },
    closebill() { this.cur_view = '' }
  }
}
</script>

<style scoped>
.cssPending { border-color: #3b82f6; }
.cssCompleted { border-color: #10b981; }
.cssbtn { cursor: pointer; transition: 0.3s; }
.cssapptrow { transition: 0.3s; }
.cssreceipientbox { z-index: 50; }
</style>
