<template>
  <article class="w-screen min-h-full h-auto absolute top-0 left-0 mt-2 z-30">
    <div class="w-full flex justify-center flex-wrap">
      <div
        class="
          csscard
          mx-auto
          rounded-xl
          shadow-2xl
          mt-4
          w-full
          lg:w-1/2
          h-auto
          p-4
          bg-EF-blue
        "
      >
        <!-- Header -->
        <div class="flex justify-between items-center">
          <img
            :src="imageroot_mcle + '/logo/' + loggeduser.clientcode + '.png'"
            class="w-48"
            alt="Logo"
          />
          <div class="font-bold uppercase text-center w-full text-blue-400">
            <div v-if="!isOtherTest">{{ cur_report.report_details.reportcontents.reportName }}</div>
            <input
              v-else
              type="text"
              class="w-64 px-4 rounded-md bg-EF-green-100 text-gray-600"
              v-model="cur_report.report_details.reportcontents.reportName"
            />
          </div>
          <div class="hover:text-red-700 cursor-pointer" title="Close" @click="getClose">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 -mt-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <!-- Report Info -->
        <div class="my-2 border-t-2 border-EF-green-300">
          <div class="font-bold pt-2 text-blue-400">Report Details</div>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-1 mt-2 text-white">
            <div><span class="text-sm font-semibold">Ref No:</span> <span class="font-thin">{{ cur_report.labreport.refno }}</span></div>
            <div><span class="text-sm font-semibold">Name:</span> <span class="font-thin">{{ cur_report.cus_info.name }}</span></div>
            <div><span class="text-sm font-semibold">Age:</span> <span class="font-thin">{{ cur_report.cus_info.age }}</span></div>
            <div><span class="text-sm font-semibold">Sex:</span> <span class="font-thin">{{ cur_report.cus_info.sex }}</span></div>
            <div><span class="text-sm font-semibold">Date:</span> <span class="font-thin">{{ $options.filters.toShortDate(cur_report.cus_info.date) }}</span></div>
          </div>

          <!-- Lab & Price/Commission -->
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-1 mt-2">
            <selectinput2
              class="w-32"
              v-model="cur_report.labreport.labname"
              :cur_item="cur_report.labreport.labname"
              :selections="initData.arrlabs"
              :err="err.collection"
              @changed="labnameChanged"
              label="Collection"
            />

            <div v-if="isOtherTest || isOutSideLab">
              <div class="text-sm font-semibold text-white">Price (Rs.)</div>
              <input
                type="text"
                @input="numericInput('test.price')"
                v-model="cur_report.test.price"
                class="w-32 bg-EF-green-100 rounded px-2 text-gray-700"
                maxlength="5"
              />
            </div>

            <div v-if="isOtherTest || isOutSideLab">
              <div class="text-sm font-semibold text-white">Commission (Rs.)</div>
              <input
                type="text"
                @input="numericInput('commision')"
                v-model="cur_report.commision"
                class="w-32 bg-EF-green-100 rounded px-2 text-gray-700"
                maxlength="4"
              />
            </div>

            <div v-if="isOtherTest || isOutSideLab">
              <div class="text-sm font-semibold text-white">Other Lab Ref</div>
              <input
                type="text"
                v-model="cur_report.otherlabref"
                class="w-32 bg-EF-green-100 rounded px-2 text-gray-700"
                maxlength="20"
              />
            </div>

            <div>
              <dynamicsearchinput
                :arrItems="initData.arr_doctors"
                :Item="getDoctor(cur_report.labreport.doctor)"
                v-model="cur_report.labreport.doctor"
                label="Requested By"
                ref="refdoctor"
                :err="err.requestedby"
                @LoadItems="getSerachDoctor"
                @selectedItem="selectDoctor"
              />
            </div>
          </div>

          <!-- Comment -->
          <div class="w-full my-2">
            <div class="text-sm font-semibold text-white">Comment</div>
            <textarea v-model="cur_order_item.comment" class="w-full bg-EF-green-100 rounded px-2 text-gray-700"></textarea>
          </div>
        </div>

        <!-- Inside Lab Section -->
        <div v-show="!isOutSideLab">
          <div class="font-bold mb-2 my-4 w-full border-t-2 pt-2 border-EF-green-300 text-blue-400">Test Result</div>
          <div class="cssReportBody">
            <component
              :is="reportComponentName"
              :report_details="cur_report.report_details"
              ref="reportcomp"
            />
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-5 mt-6 w-full justify-items-center gap-y-2">
            <button_mlab class="w-32 lg:w-24" text="Clear" title="Clear Report" @click="getClear" />
            <button_mlab class="w-32 lg:w-24" text="Save" title="Save Report" @click="getSave" />
            <button_mlab class="w-32 lg:w-24" text="Print" title="Print Report" @click="getPrint" />
            <button_mlab class="w-32 lg:w-24" text="PDF" title="PDF Report" @click="getPdf" />
            <button_mlab class="w-32 lg:w-24" text="Close" title="Close Report View" @click="getClose" />
          </div>
        </div>

        <!-- Outside Lab Section -->
        <div v-show="isOutSideLab">
          <div class="font-bold mb-2 my-4 w-full border-t-2 pt-2 border-EF-green-300 text-white capitalize">
            Report Details - {{ cur_report.labreport.labname }}
          </div>

          <div class="cssReportBody text-white">
            <div class="flex gap-x-2 mt-4">
              <div class="w-40 text-sm font-semibold">Upload Report Pdf</div>
              <div>
                <a
                  v-if="cur_report.labreport.printpdf"
                  :href="imageroot_mcle + '/mlab/mreport/' + loggeduser.clientcode + '/outsource/' + cur_report.labreport.printpdf"
                  target="_blank"
                >
                  <img class="cursor-pointer w-16 rounded" :src="imageroot_mcle + '/Images/pdfico.png'" alt="Download" />
                </a>
                <pdf_fileupload
                  v-model="Uploading_file_details.file"
                  @FileChanged="FileChanged"
                  ref="refPdfReportFile"
                />
              </div>
            </div>

            <div class="flex justify-end gap-x-4 mt-4">
              <button_mlab class="w-32 lg:w-24" text="Save" title="Save Report" @click="getSave" />
              <button_mlab class="w-32 lg:w-24" text="Close" title="Close Report View" @click="getClose" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import button_mlab from '~/components/mlab/mlab_btn'
import selectinput2 from '~/components/customcontrol/selectinput2_report'
import pdf_fileupload from '~/components/customcontrol/pdf_fileupload'
import dynamicsearchinput from '~/components/customcontrol/dynamicsearchinput'

// Import all report components
import * as Reports from '~/components/reports/reporttypes/all_reports' // assuming you re-export all reports

export default {
  components: {
    button_mlab,
    selectinput2,
    pdf_fileupload,
    dynamicsearchinput,
    ...Reports
  },
  props: ['report_details'],
  data() {
    return {
      imageroot_mcle: process.env.McleAssets,
      isOutSideLab: false,
      isFileChanged: false,
      Uploading_file_details: { file: '', destpath: '', filetype: 'pdf', height: 0, width: 0 },
      err: { collection: '', arrrequestedby: '', specimen: '' },
    }
  },
  computed: {
    ...mapState({
      cur_report: (state) => state.test.cur_report,
      loggeduser: (state) => state.loggeduser,
      initData: (state) => state.test.initData,
      printed_pdfname: (state) => state.test.printed_pdfname,
      company: (state) => state.company,
      uploaded_file: (state) => state.miracle.uploaded_file,
      cur_order_item: (state) => state.labappt.cur_order_item,
    }),
    isOtherTest() {
      return this.cur_report.test.testname.includes('Other')
    },
    getDoctor() {
      return (docname) => ({ id: docname, value: docname })
    },
    reportComponentName() {
      const map = {
        1: 'Report_Full_Blood_Count',
        2: 'Report_Platelet_Count',
        3: 'Report_WBC_DC_PLATELET_PCV',
        4: 'Report_HB_PCV',
        5: 'Report_Erythrocyte_Sedimentation_Rate',
        6: 'Report_Hemoglobin',
        7: 'Report_Blood_Group',
        8: 'Report_Bleeding_Time',
        9: 'Report_Malarial_Parasites',
        10: 'Report_Fasting_Blood_Sugar',
        11: 'Report_RBS_PPBS',
        12: 'Report_Blood_Sugar_Series',
        13: 'Report_Oral_Glucose_Tolarance_Test',
        14: 'Report_Glucose_Challenge_Test_50g',
        15: 'Report_Cholesterol',
        16: 'Report_LIPID_Profile',
        17: 'Report_ASOT',
        18: 'Report_Blood_Urea_Serum_Creatinine',
        19: 'Report_C_Reactive_Protein',
        20: 'Report_Rheumatoid_Factor',
        21: 'Report_Dengue_Antibody_Test',
        22: 'Report_Filaria_Antibody_Test',
        23: 'Report_Pregnancy_Profile',
        24: 'Report_SGOT_SGPT',
        25: 'Report_VDRL',
        26: 'Report_BilliRubin',
        27: 'Report_Urine_Full_Report',
        28: 'Report_Human_Chorionic_Gonadotrophine',
        29: 'Report_Stool_Full_Report',
        30: 'Report_BT_Common',
        31: 'Report_ST_Common',
        32: 'Report_UST_Common',
        33: 'Report_RBS_PPBS2',
        34: 'Report_RBS_PPBS1',
        35: 'Report_Serum_Creatinine',
        36: 'Report_Blood_Urea',
        37: 'Report_SGPT',
        38: 'Report_SGOT',
        39: 'Report_Dengue_Antigen_Test',
        40: 'Report_Troponin_1',
        41: 'Report_HIV_I_II'
      }
      return map[this.cur_report.report_details.reportcontents.reportid] || null
    }
  },
  methods: {
    ...mapActions({
      getPrintLabReport: 'test/getPrintLabReport',
      getSaveLabReport: 'labappt/getSaveLabReport',
      getSavePDF: 'miracle/SaveAnyFile',
      getSearchDoctor: 'test/getSearchDoctor',
    }),

    numericInput(field) {
      const keys = field.split('.')
      let obj = this.cur_report
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = obj[keys[keys.length - 1]].toString().replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    },

    async getSerachDoctor(searchstring) { await this.getSearchDoctor({ searchval: searchstring }) },
    selectDoctor(selecteddoctor) { this.cur_report.labreport.doctor = selecteddoctor.id },
    FileChanged() { this.isFileChanged = true },

    labnameChanged(labname) {
      this.isOutSideLab = this.company.name != labname
      this.cur_report.labreport.labname = labname
    },

    getClear() { this.$refs.reportcomp.getclearValues() },

    getFillReportData() {
      const r = this.cur_report
      r.report_details.reportcontents.cus_info = { ...r.cus_info }
      r.report_details.reportcontents.refno = r.labreport.refno
      r.report_details.reportcontents.collection = r.labreport.labname
      r.report_details.reportcontents.requestedby = r.labreport.doctor
      r.labreport.reportdata = JSON.stringify(r.report_details)
    },

    async getSave() {
      this.getFillReportData()
      if (this.isFileChanged && this.isOutSideLab) {
        this.Uploading_file_details.destpath = `mlab\\mreport\\${this.loggeduser.clientcode}\\outsource\\temp.pdf`
        await this.getSavePDF({ user: this.loggeduser, filedetails: this.Uploading_file_details })
        this.isFileChanged = false
        this.cur_report.labreport.printpdf = this.uploaded_file
        this.cur_report.labreport.emailpdf = this.uploaded_file
      }

      this.cur_report.commision = parseFloat(this.cur_report.commision)
      this.cur_report.test.price = parseFloat(this.cur_report.test.price)

      this.getSaveLabReport({
        Labreport: this.cur_report.labreport,
        cur_report: this.cur_report,
        testname: this.cur_report.test.testname,
        otherReportName: this.cur_report.report_details.reportcontents.reportName,
        otherReportPrice: this.cur_report.test.price,
        comment: this.cur_order_item.comment,
        user: this.loggeduser,
      })
    },

    getClose() { this.$emit('getexitform') },

    async getPrint() {
      this.getFillReportData()
      await this.getSaveLabReport({ Labreport: this.cur_report.labreport, user: this.loggeduser })
      await this.getPrintLabReport({ Labreport_id: this.cur_report.labreport.id, ispdf: false, user: this.loggeduser })
      if (this.pdfname) window.open(`${this.imageroot_mcle}/mlab/mreport/${this.loggeduser.clientcode}/${this.printed_pdfname}`, '_blank')
    },

    async getPdf() {
      this.getFillReportData()
      await this.getSaveLabReport({ Labreport: this.cur_report.labreport, user: this.loggeduser })
      await this.getPrintLabReport({ Labreport_id: this.cur_report.labreport.id, ispdf: true, user: this.loggeduser })
      if (this.pdfname) window.open(`${this.imageroot_mcle}/mlab/mreport/${this.loggeduser.clientcode}/${this.printed_pdfname}`, '_blank')
    },

    init(labname) { this.isOutSideLab = this.company.name != labname }
  }
}
</script>

<style>
.csscard {}
</style>
