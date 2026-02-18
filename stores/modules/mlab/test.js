// stores/test.js
import { defineStore } from 'pinia'
import axios from 'axios'

const api_call = axios.create({
  baseURL: process.env.base_url,
})

const api_call_miracle = axios.create({
  baseURL: process.env.base_url_miracle,
})

export const useTestStore = defineStore('test', {
  state: () => ({
    loading: false,

    cur_report: {
      report_details: {
        reportcontents: {
          reportName: '',
          specimen: '',
          requestedby: '',
          collection: '',
          cus_info: {},
        },
      },
      labreport: {},
      cus_info: { name: '', age: '', sex: '', date: '' },
      test: { testname: '' },
    },

    printed_pdfname: '',

    initData: {
      arr_doctors: [{ id: '', value: '' }],
      arrlabs: [],
      arr_color: ['white', 'yellow', 'red'],
      arr_appearence: [],
      arr_specific_gravity: [],
      arr_reaction: [],
      arr_protein_albumine: [],
      arr_nitrate: [],
      arr_glucose: [],
      arr_ketones: [],
      arr_bilirubin: [],
      arr_casts: ['aa', 'bb'],
      arr_organisms: [],
      arr_others: [],
    },

    available_reports: [],

    test: {
      id: 0,
      createddate: '1900-01-01',
      updateddate: '1900-01-01',
      createdby: '',
      updatedby: '',
      testtype: '',
      testname: '',
      testclassname: '',
      description: '',
      parameter: '',
      formula: '',
      reporttemplate: '',
      price: '',
      discount: '',
      status: 1,
    },

    testresult: {},
    altest: [],
    iseditmode: false,
    report_details: {},
  }),

  actions: {
    setLoading(value) {
      this.loading = value
    },

    pushNotification(type, message) {
      console.log(`[${type}] ${message}`)
      // Replace with your actual notification system
    },

    // --- Doctor Search ---
    async getSearchDoctor(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call_miracle.post('/Doctor/getSearch', req)
        if (data.result.resultcode === 100) {
          this.initData.arr_doctors = data.arrdoctor
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    // --- Initialization ---
    async getInitData(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/getInitData', req)
        if (data.result.resultcode === 100) {
          this.initData = data.initData
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async LoadTestReport(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/LoadTestReport', req)
        if (data.result.resultcode === 100) {
          this.cur_report = data.cur_report
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getAvaialbleReports(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/getAvaialbleReports', req)
        if (data.result.resultcode === 100) {
          this.available_reports = data.available_reports
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getTestType(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/getTestType', req)
        if (data.result.resultcode === 100) {
          this.report_details = data.report_details
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getPrintLabReport(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/getPrintLabReport', req)
        if (data.result.resultcode === 100) {
          this.printed_pdfname = data.pdfname
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getPrintLabReport_Appt(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/getPrintLabReport_Appt', req)
        if (data.result.resultcode === 100) {
          this.printed_pdfname = data.pdfname
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    // --- CRUD ---
    async getSearch(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/getSearch', req)
        if (data.result.resultcode === 100) {
          this.testresult = data.testresult
          this.altest =
            data.testresult.totalpages > 0 ? data.testresult.alpagedetails[0].altest : []
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getSave(req) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/test/getSave', req)
        if (data.result.resultcode === 100) {
          if (req.test.id === 0 && data.updated_test.id > 0) {
            this.altest.unshift(data.updated_test)
          } else {
            const index = this.altest.findIndex((a) => a.id === data.updated_test.id)
            if (index !== -1) this.altest[index] = data.updated_test
          }
          this.pushNotification('Success', data.result.resultdesc)
          this.iseditmode = false
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getSaveImage(Uploading_image_details) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/Upload', Uploading_image_details)
        if (data.result.resultcode === 100) {
          this.test.image = data.uploaded_image_name
          this.pushNotification('Success', data.result.resultdesc)
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    async getDelete(test) {
      this.setLoading(true)
      try {
        const { data } = await api_call.post('/Test/getDelete', test)
        if (data.result.resultcode === 100) {
          this.altest = this.altest.filter((a) => a.id !== data.updated_test.id)
          this.pushNotification('Success', data.result.resultdesc)
        } else {
          this.pushNotification('Failed', data.result.resultdesc)
        }
      } catch (error) {
        this.pushNotification('Failed', error.message || error)
      } finally {
        this.setLoading(false)
      }
    },

    // --- Helpers ---
    setPage(pagenumber) {
      if (this.testresult.alpagedetails && this.testresult.alpagedetails[pagenumber - 1]) {
        this.altest = this.testresult.alpagedetails[pagenumber - 1].altest
      }
    },

    setEditMode(flag) {
      this.iseditmode = flag
    },

    clearTest() {
      this.test = {
        id: 0,
        createddate: '1900-01-01',
        updateddate: '1900-01-01',
        createdby: '',
        updatedby: '',
        testtype: '',
        testname: '',
        testclassname: '',
        description: '',
        parameter: '',
        formula: '',
        reporttemplate: '',
        price: '',
        discount: '',
        status: 1,
      }
    },

    clearAllTest() {
      this.altest = []
    },
  },
})
